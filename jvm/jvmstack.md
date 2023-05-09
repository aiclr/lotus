# Java Virtual Machine Stacks

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

---

![image](../img/运行时数据区jdk8.svg)

---

> 与`pc register`一样，`JVM Stack`是**线程私有**的，生命周期与线程相同。\
> `JVM Stack` 描述的是Java方法执行的线程内存模型：每个方法被执行的时候，JVM都会同步创建一个`Stack Frame`
> > `Stack Frame`用于存储
> > 1. `Local Variables`<sub>局部变量表</sub>
> > 2. `Operand Stacks`<sub>操作数栈</sub>
> > 3. `Dynamic Linking`<sub>动态链接</sub>
> > 4. `Method Invocation Completion`<sub>方法调用结束</sub>
> > > 1. `Normal Method Invocation Completion`<sub>方法调用正常结束</sub>
> > > 2. `Abrupt Method Invocation Completion`<sub>方法调用异常结束</sub>
>
> 每一个方法被调用直至执行完毕的过程，就对应着一个`Stack Frame`在`JVM Stack`中从**入栈**到**出栈**的过程。
> > 方法执行-**入栈**\
> > 方法执行结束-**出栈**

---

> 由于跨平台性的设计，java的指令都是根据栈来设计的，不同平台cpu架构不同，所以不能基于寄存器来设计\
> 优点是跨平台，指令集小，编译器容易实现，缺点是性能下降，实现同样的功能需要更多的指令

## Stack Frame

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6)

### Local Variables

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.1)\
> `Local Variables` 存放了**编译期可知**的各种**JVM基本数据类型、reference、returnAddress**
> > **JVM基本数据类型**：byte、boolean、short、char、int、float、long、double\
> > **reference对象引用类型**：并不等同于对象本身，可能是一个指向对象**起始地址的引用指针**，也可能是指向一个代表对象的**句柄**或者其他与此对象相关的位置\
> > **returnAddress**：指向一条**字节码指令地址**
>
> 这些数据类型在`Local Variables`中的存储空间以`Slot`<sub>变量槽</sub>来表示，其中占用`64bit`的`long`和`double`类型数据会占用两个Slot，其余的数据类型只占用一个。\
> `Local Variables`所需的内存空间在**编译期**完成分配，\
> 当进入一个方法时，这个方法需要在`Stack Frame`中分配多大的`Local Variables`空间是**完全确定**的，\
> 在**方法运行期间不会改变**`Local Variables`的大小<sub>**大小指Slot的数量**</sub>，\
> JVM真正使用多大的内存空间来实现一个Slot，由具体的JVM实现自行决定<sub>譬如按照一个Slot占用32bit、64bit，或者更多</sub>。

#### Slot

### Operand Stacks

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.2)

### Dynamic Linking

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.3)

### Normal Method Invocation Completion

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.4)

### Abrupt Method Invocation Completion

> [Oracle 官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.5)
