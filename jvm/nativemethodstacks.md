# Native Method Stacks

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.6)
> > An implementation of the Java Virtual Machine may use conventional<sub>传统的</sub> stacks, colloquially<sub>通俗地</sub> called "`C stacks`," to support native methods<sub>methods written in a language other than the Java programming language</sub>.\
> > Native method stacks may also be used by the implementation of an interpreter<sub>解释程序</sub> for the Java Virtual Machine's instruction<sub>(计算机的)指令</sub> set in a language such as C.\
> > Java Virtual Machine implementations that cannot load native methods and that do not themselves rely on<sub>依靠</sub> conventional<sub>传统的</sub> stacks need not supply native method stacks.\
> > If supplied, native method stacks are typically<sub>通常</sub> allocated<sub>分配…(给)</sub> per thread when each thread is created.
> >
> > This specification<sub>规范</sub> permits native method stacks either to be of a fixed<sub>固定的</sub> size or to dynamically *expand and contract*<sub>伸缩</sub> as required by the computation<sub>计算</sub>.\
> > If the native method stacks are of a fixed size, the size of each native method stack may be chosen<sub>选择</sub> independently<sub>独立地</sub> when that stack is created.
> >
> > *A Java Virtual Machine implementation may provide the programmer or the user control over<sub>支配</sub> the initial size of the native method stacks,
> > as well as, in the case of varying-size<sub>大小不一</sub> native method stacks, control over<sub>支配</sub> the maximum and minimum method stack sizes.*
> >
> > The following exceptional conditions<sub>情况</sub> are associated with<sub>与…有关</sub> native method stacks:
> > > If the computation in a thread requires a larger native method stack than is permitted, the Java Virtual Machine throws a `StackOverflowError`.\
> > > If native method stacks can be dynamically expanded and native method stack expansion is attempted but insufficient<sub>不足的</sub> memory can be made available,
> > > or if insufficient<sub>不足的</sub> memory can be made available to create the initial native method stack for a new thread,
> > > the Java Virtual Machine throws an `OutOfMemoryError`.
>
> 《深入理解Java虚拟机》
> > `Native Method Stacks` 与`JVM Stacks` 所发挥的作用是非常相似的，其区别只是`JVM Stacks`为`jvm`执行`Java`方法<sub>也就是字节码 </sub>服务，而`Native Method Stacks`是为`jvm`使用到的`Native Method`服务\
> > JVM规范对`Native Method Stacks`中方法使用的**语言**、**使用方式**、**数据结构**并没有任何强制规定，因此具体的`jvm`可以根据需要自由实现它，甚至有的`JVM`<sub>HotSpot</sub>直接把`Native Method Stacks`与`JVM Stacks`合二为一。\
> > 与`JVM`一样，`Native Method Stacks`也会在stack深度溢出时抛出`StackOverflowError`或者stack扩展失败时抛出`OutOfMemoryError`
>
> `Native Method Stacks`特点
> - 管理`Native Method`的调用
> - 线程私有
> - 容量允许被实现成固定大小或可动态扩展
>
> `Native Method Interface`<sub>`JNI`,本地方法接口</sub>\
> `Native Method Library` <sub>本地方法库</sub>

[top](#native-method-stacks)🚦[home](../index.md#jvm)

## Native Method

> A native method is a java method whose implementation is provided by non-java code
>
> 概述
> > `Native Method`是java调用非java代码实现的接口.该方法的实现由非java语言实现<sub>例如c或c++</sub>。\
> > 这个特征非java所特有，很多编程语言都有这一机制<sub>例如：`c++`中可以使用`extern "C"` 告知`c++编译器`去调用一个`c函数`</sub>
> >
> > 在定义一个`native method`时，并不提供具体实现<sub>有些像定义一个`java interface`</sub>， 其具体实现是由非java语言在jvm外部实现\
> > `Native Method Interface`的作用是融合不同的编程语言为Java所用，初衷是融合c/c++程序\
>
> 本地方法使用c语言实现时
> > 具体做法是`native method stacks`中登记`native方法`\
> > 在`Execution engine`执行时加载`native method library`\
> > 当某个线程调用一个`native method`时他就进入了一个全新的并且不再受`JVM`限制的世界，它和虚拟机拥有同样的权限
> > 1. `native method`可以通过`native method interface`来访问JVM内部的`runtime data area`
> > 2. 它甚至可以直接使用本地处理器中的寄存器
> > 3. 直接从本地内存的堆中分配任意数量的内存
>
> > 注意：
> > > **使用`native`标识符修饰，不能与`abstract`修饰符连用**
> > > - `java.lang.Object`
> > >   - `public native int hashCode();`
> > >   - `public final native void notify();`
> > >   - `public final native void notifyAll();`
> > > - `java.lang.Thread`
> > >   - `private native void start0();`
> > >   - `private native void setPriority0(int newPriority);`
> > >   - `private native void stop0(Object o);`
> > >   - `private native void suspend0();`
> > >   - `private native void resume0();`
> > >   - `private native void interrupt0();`
> > >   - `private native void setNativeName(String name);`
>
> 使用原因
> > 主要原因是java应用需要与java外面的环境交互。
> > > 有些层次的任务使用java实现起来不容易，或者对程序的效率有影响\
> > > 当java需要与一些**底层系统**，如操作系统或某些**硬件**交换信息时的情况，`native method`正是这样一种交流机制\
> > > 通过`native method`提供一个非常简洁的接口<sub>`JNI`</sub>，无需去了解java应用之外的繁琐的细节
> >
> > 与操作系统交互
> > > JVM支持java语言本身和运行时库，它是java程序赖以生存的平台，由一个**解释器**<sub>解释字节码</sub>和一些连接到本地代码的库组成\
> > > **JVM不是一个完整的系统**，经常依赖于一些底层系统的支持。这些底层系统常常是强大的操作系统\
> > > 通过使用`native method`得以用java实现了jre与底层系统的交互，甚至JVM的一些部分都是C写的\
> > > 如果使用一些java语言本身没有提供封装的操作系统的特性时，我们也需要使用`native method`
> >
> > `sun`s java`
> > > Sun的解释器是用`C`实现的，这使得它能像一些普通的C一样与外部交互，jre大部分是Java实现的，也有通过一些`native method`与外界交互\
> > > 例如`java.lang.Thread`的`setPriority()`方法是由`java`实现的，
> > > > 但是`setPriority()`的实现调用的是`java.lang.Thread`的`native method setPriority0()`，\
> > > > `setPriority0()`方法是由`C`实现的，并被植入JVM内部，\
> > > >在`Windows95`的平台上，这个本地方法最终将调用`Win32 setPriority() API`\
> > >
> > > 这是一个`native method`的具体实现由`JVM`直接提供的例子，更多的情况是`native method`由`external dynamic link library`<sub>外部的动态链接库</sub>提供，然后被JVM调用
>
> 现状
> > 与硬件有关的应用。
> > > 停车场管理系统通过JNI与硬件设备交互。\
> > > 通过java程序驱动打印机\
> > > Java系统管理生产设备
> >
> > 在企业级应用中比较少见因为现在的异构领域间通信很发达，比如可以使用socket通信，也可以使用Web Service等

[top](#native-method-stacks)🚦[home](../index.md#jvm)
