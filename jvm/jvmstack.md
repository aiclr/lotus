# Java Virtual Machine Stacks

![image](../img/运行时数据区jdk8.svg)

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.2)
> > 2.5.2. Java Virtual Machine Stacks
> > > Each Java Virtual Machine thread has a private Java Virtual Machine stack, created at the same time as the thread.\
> > > A Java Virtual Machine stack stores frames ([§2.6](#stack-frame)).\
> > > A Java Virtual Machine stack is analogous<sub>类似的</sub> to the stack of a conventional<sub>传统的</sub> language such as C:\
> > > it holds local variables and partial<sub>传统的</sub> results, and plays a part in method invocation<sub>调用</sub> and return.\
> > > Because the Java Virtual Machine stack is never manipulated<sub>操作</sub> directly except<sub>除…之外</sub> to push and pop frames, frames may be heap allocated<sub>分配的</sub>.\
> > > The memory for a Java Virtual Machine stack does not need to be contiguous<sub>连续的</sub>.\
> > >
> > > *In the First Edition<sub>版本</sub> of The Java® Virtual Machine Specification<sub>规范</sub>, the Java Virtual Machine stack was known as<sub>被称为</sub> the Java stack.*
> > >
> > > This specification<sub>规范</sub> permits<sub>允许</sub> Java Virtual Machine stacks either to be of a fixed<sub>固定的</sub> size or to dynamically<sub>动态的</sub> expand<sub>扩大</sub> and contract<sub>缩小</sub> as required by<sub>根据需要</sub> the computation<sub>计算</sub>.\
> > > If the Java Virtual Machine stacks are of a fixed size, the size of each Java Virtual Machine stack may be chosen<sub>选择</sub> independently<sub>独立地</sub> when that stack is created.
> > >
> > > *A Java Virtual Machine implementation<sub>实现</sub> may provide the programmer<sub>程序员</sub> or the user control over the initial<sub>初始</sub> size of Java Virtual Machine stacks,\
> > > as well as, in the case of dynamically expanding or contracting Java Virtual Machine stacks, control over the maximum and minimum sizes.*
> > >
> > > The following exceptional<sub>异常的</sub> conditions<sub>情况</sub> are associated<sub>有关联的</sub> with Java Virtual Machine stacks:
> > > - If the computation<sub>计算</sub> in a thread requires a larger Java Virtual Machine stack than is permitted<sub>被允许</sub>, the Java Virtual Machine throws a **StackOverflowError**.
> > > - If Java Virtual Machine stacks can be dynamically expanded,\
> > > and expansion<sub>扩大</sub> is attempted<sub>尝试</sub> but insufficient memory<sub>内存不足</sub> can be made available to effect<sub>实现</sub> the expansion,\
> > > or if insufficient memory can be made available to create the initial<sub>初始</sub> Java Virtual Machine stack for a new thread,\
> > > the Java Virtual Machine throws an **OutOfMemoryError**.
>
> 不同平台cpu架构不同，不能基于寄存器来设计java指令集\
> 为了实现跨平台，java指令集根据stack<sub>First In Last Out</sub>特性设计
> > 优点：跨平台、指令集小、编译器容易实现\
> > 缺点：性能下降、实现同样功能需要更多的指令
>
> 与`pc register`一样，`JVM Stack`是**线程私有**的，生命周期与线程相同。\
> `JVM Stack` 描述的是Java方法执行的线程内存模型：每个方法被执行的时候，JVM都会同步创建一个`Stack Frame`
> > `Stack Frame`用于存储
> > 1. `Local Variables`<sub>局部变量表，影响`stack frame`大小</sub>
> > 2. `Operand Stacks`<sub>操作数栈，影响`stack frame`大小</sub>
> > 3. `Dynamic Linking`<sub>动态链接，指向运行时常量池的方法引用</sub>
> > 4. `Method Invocation Completion`<sub>方法调用结束</sub>
> > > 1. `Normal Method Invocation Completion`<sub>方法调用正常结束</sub>
> > > 2. `Abrupt Method Invocation Completion`<sub>方法调用异常结束</sub>
>
> jvm Stack 特点：
> > 每一个方法被调用直至执行完毕的过程，就对应着一个`Stack Frame`在`JVM Stack`中从**入栈**到**出栈**的过程。
> > > 方法执行-**入栈**\
> > > 方法执行结束-**出栈**
> >
> > jvm Stack 是一种快速有效的分配存储方式，访问速度仅次于The pc Register\
> > jvm Stack 没有 GC
>
> jvm Stack 可能出现的内存错误；jvm规范允许jvm Stack的大小固定不变或动态扩展
> > `StackoverflowError`
> > > jvm Stack的大小固定，每个线程的jvm Stack大小在线程创建时独立设置，如果线程请求分配的jvm Stack大小超过jvm stack允许的最大容量，JVM将抛出StackOverflowError
> >
> > `OutOfMemmoryError`
> > 1. 动态扩展的jvm stack，尝试扩展时无法申请到足够的内存，JVM将抛出OutOfMemoryError
> > 2. 创建新的线程时没有足够的内存去创建对应的jvm stack，JVM将抛出OutOfMemoryError

## Stack Frame

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6)
> > A frame is used to store data and partial<sub>部分的</sub> results, as well as to perform<sub>执行</sub> dynamiclinking, return values for methods, and dispatch<sub>调遣</sub> exceptions.
>
> > A new frame is created each time a method is invoked.\
> > A frame is destroyed when its method invocation<sub>调用</sub> completes, whether<sub>或者…（或者）</sub> that completion is normal or abrupt (it throws an uncaught<sub>未捕获</sub> exception).\
> > Frames are allocated<sub>分配</sub> from the **Java Virtual Machine stack** ([§2.5.2](#java-virtual-machine-stacks)) of the thread creating the frame.\
> > Each frame has its own **array** of **local variables** ([§2.6.1](#local-variables)), its own **operand stack** ([§2.6.2](#operand-stacks)), and **a reference to the runtime constant pool** ([§2.5.5](TODO)) of the class of the current method.
>
> > *A frame may be extended<sub>扩展</sub> with additional<sub>附加的</sub> implementation-specific<sub>具体实现</sub> information, such as debugging information.*
>
> > The sizes of the **local variable array** and the **operand stack** are determined<sub>确定的</sub> at compile-time<sub>编译时期</sub> and are supplied<sub>提供</sub> along with<sub>随同…一起</sub> the code for the method associated with<sub>与…有关</sub> the frame ([§4.7.3](TODO)).\
> > Thus<sub>因此</sub> the size of the frame data structure depends only on the implementation<sub>实现</sub> of the Java Virtual Machine, and the memory for these structures can be allocated<sub>分配</sub> simultaneously<sub>同时</sub> on method invocation<sub>调用</sub>.\
> > Only one<sub>唯一</sub> frame, the frame for the executing method, is active at any point in a given thread of control.\
> > This frame is referred to<sub>被称为</sub> as the current frame, and its method is known as<sub>被称为</sub> the current method.\
> > The class in which the current method is defined<sub>定义</sub> is the current class.\
> > Operations<sub>操作</sub> on **local variables** and the **operand stack** are typically<sub>通常</sub> with reference to<sub>关于</sub> the current frame.
>
> > A frame ceases<sub>结束</sub> to be `current`<sub>当前帧</sub> if its method invokes another method or if its method completes.\
> > When a method is invoked, a new frame is created and becomes `current`<sub>当前帧</sub> when control<sub>控制权</sub> transfers<sub>转让</sub> to the new method.\
> > On method return, the current frame passes<sub>沿某方向移动</sub> back the result of its method invocation, if any<sub>如果有的话</sub>, to the previous<sub>先前的</sub> frame.\
> > The current frame is then discarded<sub>丢弃</sub> as the previous<sub>先前的</sub> frame becomes the `current`<sub>当前帧</sub> one.\
> > Note that a frame created by a thread is local to that thread and cannot be referenced<sub>引用</sub> by any other thread.
>
> stack frame是一个内存区块，是一个数据集，维系着方法执行过程中的各种数据信息\
> > 在一条活动线程中，一个时间点上只会有一个活动的栈帧<sub>栈顶栈帧，即当前正在执行的方法的栈帧</sub>是有效的，这个栈帧称为`current`<sub>当前栈帧</sub>\
> > `current frame` 对应的方法是`current method`\
> > 定义`current method`的类是`current class`\
> > `Execution Engine`<sub>执行引擎</sub>运行的所有**字节码指令**只针对`current frame`进行操作 \
> > 在`a`方法中调用`b`方法
> > > `b`方法对应的`stack frame`会被创建并**入栈**，成为**栈顶栈帧**，`b`方法对应的`stack frame`成为新的`current`。\
> > > 当`b`方法正常执行完，`b`方法对应的`stack frame`**出栈**，则`a`方法对应的`stack frame`重新变为**栈顶栈帧**，成为新的`current`
> >
> > JAVA方法两种返回函数方式<sub>stack frame出栈</sub>
> > 1. 函数正常返回，使用`return`**指令**
> > 2. 抛异常<sub>未用`try-catch`捕获处理</sub>

### Local Variables

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.1)
> > Each frame ([§2.6](#stack-frame)) contains an array of variables known as its local variables.\
> > The length of the local variable array of a frame is determined<sub>确定</sub> at compile-time<sub>编译时期</sub>\
> > and supplied<sub>提供</sub> in the binary representation<sub>二进制表示法</sub> of a class or interface along with the code for the method associated with<sub>与…有关</sub> the frame ([§4.7.3]).
>
> > **A single local variable** can hold a value of type `boolean`, `byte`, `char`, `short`, `int`, `float`, `reference`, or `returnAddress`.\
> > **A pair of local variables** can hold a value of type `long` or `double`.
>
> > **Local variables** are addressed by **indexing**.\
> > The index of the first local variable is **zero**.\
> > An integer is considered<sub>经过深思熟虑的</sub> to be an **index** into the local variable array if and only if<sub>当且仅当</sub> that integer is between **zero** and one less than the size of the local variable array.
>
> > A value of type `long` or type `double` occupies<sub>占用</sub> two consecutive<sub>连续的</sub> local variables.\
> > Such a value may only be addressed using the lesser index.\
> > For example, a value of type **double** stored in the local variable array at index `n` actually occupies<sub>占用</sub> the local variables with indices<sub>索引</sub> `n` and `n+1`;\
> > however, the local variable at index `n+1` cannot be loaded from. It can be stored into. However, doing so invalidates<sub>使无效</sub> the contents<sub>内容</sub> of local variable `n`.
>
> > The Java Virtual Machine does not require `n` to be even<sub>偶数</sub>.\
> > In intuitive terms<sub>直观地说</sub>, values of types `long` and `double` need not be **64-bit** aligned<sub>对齐</sub> in the local variables array.\
> > Implementors<sub>实现者</sub> are free to decide<sub>决定</sub> the appropriate<sub>合适的</sub> way to represent<sub>表示</sub> such values using the two local variables reserved<sub>保留</sub> for the value.
>
> > The Java Virtual Machine uses local variables to pass parameters on method invocation.\
> > On class method invocation, any parameters are passed in consecutive<sub>连续的</sub> local variables starting from local variable `0`.\
> > On **instance method** invocation, local variable `0` is always used to pass a **reference to the object** on which the instance method is being invoked (`this` in the Java programming language).\
> > Any parameters are subsequently<sub>随后</sub> passed in consecutive<sub>连续的</sub> local variables starting from local variable `1`.
>
> `Local Variables`是一个`Array`，存放**编译期可知**的各种**JVM基本数据类型、reference、returnAddress**
> > **JVM基本数据类型**：`byte`、`boolean`、`short`、`char`、`int`、`float`、`long`、`double`\
> > **reference对象引用类型**：并不等同于对象本身，可能是一个指向对象**起始地址的引用指针**，也可能是指向一个代表对象的**句柄**或者其他与此对象相关的位置\
> > **returnAddress**：指向一条**字节码指令地址**
>
> `Local Variables`中的存储单位以`Slot`<sub>变量槽</sub>来表示。数据从`Local Variables Array` 的索引`0`位置开始存放
> > 占用`64bit`的`long`和`double`类型数据会占用**两个Slot**\；使用时，用其占用的第一个Slot的index
> > 其余的数据只占用**一个Slot**。
>
> `Local Variables`所需的内存空间在**编译期**完成分配，\
> 当进入一个方法时，这个方法需要在`Stack Frame`中分配多大的`Local Variables`空间是**完全确定**的，\
> 在**方法运行期间不会改变**`Local Variables`的大小<sub>**大小指Slot的数量**</sub>，\
> JVM真正使用多大的内存空间来实现一个Slot，由具体的JVM实现自行决定<sub>譬如按照一个Slot占用32bit、64bit，或者更多</sub>。
> 
> 当一个实例方法被调用时，方法参数和方法体内部定义的局部变量将会按照声明顺序放置到`local variables array`
> > 如果`current frame`是由**构造方法**或者**实例方法**创建的，那么该对象引用`this`将会存放在索引为`0`的Slot，其余变量按照位置顺序继续排列\
> > **静态方法**不存在对象引用`this`，其`local variables`不会保存`this`,所以**静态方法中**不能使用`this`
>
> 如果一个局部变量过了其作用域，那么在其作用域之后申明的新的局部变量就很可能会复用过期局部变量的`slot`,从而达到节省资源的目的

### Operand Stacks

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.2)

### Dynamic Linking

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.3)

### Normal Method Invocation Completion

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.4)

### Abrupt Method Invocation Completion

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.5)
