# c

| [home](index.md#c)                      |
| :-------------------------------------- |
| [gcc](#gcc)                             |
| [gdb](#gdb)                             |
| [keyword](#keyword)                     |
| [链接静态库/动态库时搜索路径顺序](#lib)      |
| [指针大乱斗](#pointer)                   |

## pointer

| 符号 | 含义         |
| :--- | :----------- |
| *    | 表示一个指针 |
| ()   | 表示一个函数 |
| []   | 表示一个数组 |

> `int board[8][9];`
> > 声明一个包含8个含有9个int元素数组的数组 \
> > 先看`[8]`: board 是一个包含8个元素的数组 \
> > 再看`[9]`: 每个元素是包含一个含有9个元素的数组 \
> > 最后`int`: 含有9个元素的数组元素类型为int
>
> `int **ptr;`
> > 声明一个指向int的指针的指针
>
> `int * risks[10];`
> > 声明一个内含10个元素的数组，元素是指向int的指针，**指针数组** \
> > 先看`[10]`, risks 包含10个元素的数组 \
> > 在看 `*` 数组元素类型为 指针 \
> > 最后 `int` 指针为 指向int的指针
>
> `int (* rusks)[10];`
> > 声明一个指向数组的指针，被指向的数组内含10个int类型的值，**数组指针** \
> > 先看`(* rusks)`, risks 是指针 \
> > 再看 `[10]` 指针指向含有10个元素的数组 \
> > 最后 `int` 数组元素为int
>
> `int * oof[3][4];`
> > 声明一个3X4的二维数组，每个元素都是指向int的指针，**二维指针数组** \
> > 先看 `[3][4]` off是包含3个含有4个元素数组的数组 \
> > `*` 含有4个元素的数组的元素为指针 \
> > `int` 指针指向int
>
> `int (* uuf)[3][4];`
> > 声明一个指向3X4二维数组的指针，被指向的二维数组内含有int类型值,**二维数组指针** \
> > 先看 `(* uuf)` uuf是个指针 \
> > `[3][4]` 指针指向一个包含3个含有4个元素数组的数组 \
> > `int` 含有4个元素数组的元素类型为int
>
> `int (* uof[3])[4];`
> > 声明一个内含3个指针元素的数组(**指针数组**)，其中每个指针都指向一个内含4个int类型元素的数组 \
> > 先看 `(* uof[3])`
> > > 含有三个指针的**指针数组** \
> > > 先看 `[3]` uof 是含有三个元素的数组 \
> > > 再看 `*` 元素类型为指针
> >
> > 再看 `[4]` 指针数组内的指针元素指向一个含有4个元素的数组 \
> > 最后 `int` 含有4个元素数组的元素类型为int
>
> `char * fump(int);`
> > 返回字符指针的函数 \
> > 先看 `*` 返回指针 \
> > 再看 `char` 返回的指针指向 char 类型
>
> `char (* frump)(int);`
> > 指向函数的指针，该函数的返回类型为char  \
> > 先看 `(* frump)` frump 是个指针 \
> > 再看 `(int)` 指针指向函数 \
> > 最后 `char` 函数返回数据类型为 char \
>
> `char (*flump[3])(int);`
> > 内含3个指针的数组，每个指针都指向返回类型为char的函数 \
> > 先看 `(* flump[3])`
> > > 先看 `[3]` 含有三个元素的数组 \
> > > 再看 `*` 数组元素类型是 指针
> >
> > 再看 `(int)` 指针指向函数 \
> > 最后 `char` 函数返回类型 char

## gcc

> -D 等于xxx.c 定义的#define PI=3.14
> > `gcc -DPI=3.14 xxx.c -o xxx`

> -v 输出预处理，汇编，编译，链接的详细信息
> > `gcc -v xxx.c -o xxx`

> -Wall 输出警告信息
> > `gcc -Wall xxx.c -o xxx`

> -Werror 产生警告时停止编译
> > `gcc -Werror xxx.c -o xxx`

> -std 指定语言标准
> > `gcc -std=c90 xxx.c -o xxx`

> -O 代码优化选项，值在0～3，default=1,0表示不优化，3表示最高优化代码运行速度最快，但是编译时间和代码体积会受到影响
> > `gcc -O2 xxx.c -o xxx`

> -E 预处理
> > `gcc -E xxx.c -o xxx.i`

> -S 汇编
> > `gcc -S xxx.i -o xxx.s`

> -c 编译
> > `gcc -c xxx.s -o xxx.o`

> 链接
> > `gcc xxx.o -o xxx`

> -I 指定头文件包含目录: b.c的头文件b.h
> > `gcc -I /home/caddy/c/cpp/h xxx.c /home/caddy/c/cpp/s/b.c -o xxx`

> -L 指定库文件目录
> > 假定在/home/caddy/c/lib 目录下有动态库 libadd.so 静态库 libadd.a. \
> > gcc默认动态库优先，\
> > -static 选项表示动态库静态库同时存在，优先使用静态库。\
> > 此外：linux下的库文件命名有一个约定，库文件以lib开头，\
> > 因为所有的库文件都遵循这个约定，所以使用-l选项指定链接的库文件名时可以省去lib三个字母。
>
> > `gcc -L /home/caddy/c/lib -static -ladd xxx.c -o xxx`

> ar 归档工具创建库文件
> > ar 创建一个归档文件libfoo.a,并将目标文件xx.o xx.o添加进去。\
> > ar工具将若干个单独的文件归并到一个大的文件中以创建归档文件或集合。\
> > ar可以创建任何类型文件的归档文件，是一个通用工具
>
> > `ar crv ../lib/static/libfoo.a xx.o xx.o`

> ranlib xxx.a 为函数库生成内容表
> > `ranlib libfoo.a`

> ar tv 列出归档的内容
> > `ar tv libfoo.a`

> ar x 解压所有归档目标文件
> > `ar x libfoo.a`

> ar dv 删除归档内的某一目标文件
> > `ar dv libfoo.a xx.o`

[top](#c) | [home](index.md#c)

## gdb

> `pacman -S gdb` \
> gcc -g 表示调试 `gcc -g debug.c -o debug.out` \
> 启动 `gdb debug.out` 不打印gdb版本信息 `gdb -q debug.out` \
> 查看源码 `list` 简写 `l`，默认每次显示10行，按回车键继续看余下的。
> > `list n` 显示当前文件以行号n为中心的前后10行代码 \
> > `list 函数名` 显示函数名所在函数的源代码 \
> > list 不带参数，将接着上一次的list命令，输出下边的内容
>
> 运行程序 `run` 简写 `r`，运行程序直到遇到结束或者遇到断点等待下一个命令。 \
> 设置断点 `break` 简写 `b`
> > `b 18` 在第18行设置断点 \
> > `b fn1 if a>b` 条件断点设置 \
> > `b func` 在函数 func() 入口处设置断点 \
> > `delete` 断点编号n 删除第n号断点 \
> > `disable` 断点编号n 暂停第n号断点 \
> > `enable` 断点编号n 开启第n号断点 \
> > `clear` 行号n 清楚第n行的断点 \
> > `delete breakpoints` 清除所有断点 \
> > `info breakpoints` 或 `info b`：显示断点信息
> > > `Num`：断点编号 \
> > > `Disp`：断点执行一次之后是否有效
> > > > `keep`：有效 \
> > > > `dis`：无效
> > >
> > > `Enb`: 当前断点是否有效
> > > > `y`：有效 \
> > > > `n`：无效
> > >
> > > `Address`: 内存地址 \
> > > `What`: 位置
>
> 启动后单步执行
> > `continue` 简写 `c` \
> > `step`<sub>step into</sub> 简写 `s` \
> > `return` 简写 `ret` 从当前函数返回 \
> > `next` 简写 `n` \
> > `until` 运行程序直到退出循环体 \
> > `until+行号` 运行至某行 \
> > `finish` 运行程序直到当前函数完成返回，并打印函数返回时的堆栈地址和返回值及参数值等信息 \
> > `call` 函数(参数) 调用程序中可见的函数，并传递参数，如 call gdb_test(55)
>
> 打印表达式
> > `print 表达式` 表达式可以是任何C语言的有效表达式，包括数字、变量甚至是函数调用 \
> > `print a` 显示a \
> > `print ++a` 将a中的值加1,并显示 \
> > `print gdb_test(22)` 将以整数22作为参数调用gdb_test()函数 \
> > `print gdb_test(a)` 将以变量a作为参数调用gdb_test()函数
>
> `display` 在单步运行时，在每次单步进行指令后，紧接着输出被设置的表达式及值。\
> `watch` 设置监视点，一旦被监视的表达式的值改变，gdb 将强行终止正在被调试的程序。 \
> `whatis` 查询变量或函数 \
> `info function` 查询函数 \
> `info locals` 显示当前对战页的所有变量
>
> 查看运行信息
> > `where/bt` 当前运行的堆栈列表 \
> > `bt backtrace` 显示当前调用堆栈 \
> > `up/down` 改变堆栈显示的深度 \
> > `set args` 参数指定运行时的参数 \
> > `show args` 查看设置好的参数 \
> > `info program` 查看程序是否在运行、进程号、被暂停的原因
>
> 分割窗口 `layout` 一边查看代码，一边调试
> > `layout src` 显示源代码窗口 \
> > `layout asm` 显示反汇编窗口 \
> > `layout regs` 显示源代码/反汇编和CPU寄存器窗口 \
> > `layout split` 显示源代码和反汇编窗口 \
> > `Ctrl+L` 刷新窗口
>
> 退出gdb `quit` 简写 `q`
>
> `cgdb`更强大的调试工具 `pacman -Syu cgdb`

[top](#c) | [home](index.md#c)

## lib

### 静态库

1. ld会先搜索GCC 命令中-L指定的目录
2. 再搜索GCC的环境变量：LIBRARY_PATH
3. 再搜索目录/lib、/usr/lib、/usr/local/lib

### 动态库

1. 编译目标代码时-L指定的目录
2. 环境变量 ：LD_LIBRARY_PATH
3. 配置文件 /etc/ld.so.conf 中指定的动态库搜索路径
4. 默认的动态库路径 /lib、/usr/lib

[top](#c) | [home](index.md#c)

## keyword

> 关键字和保留标识符,关键字是C语言的词汇，不能用他们作为标识符。 \
> 粗体表示C90标准新增的关键字，斜体表示的C99标准新增的关键字，粗斜体表示的是C11标准新增的关键字

|||||
|:---|:---|:---|:---|
|auto|extern|short|while|
|break|float|**signed**|***_Alignas***|
|case|for|sizeof|***_Alignof***|
|char|goto|static|***_Atomic***|
|**const**|if|struct|***_Bool***|
|continue|inline|switch|***_Complex***|
|defaut|int|typedef|***_Generic***|
|do|long|union|***_Imaginary***|
|double|register|unsigned|***_Noreturn***|
|else|restrict|void|***_Static_assert***|
|**enum**|return|**volatile**|***_Thread_local***|

[top](#c) | [home](index.md#c)
