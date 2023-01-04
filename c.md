# c

| [home](index.md#c)                      |
| :-------------------------------------- |
| [gcc](#gcc)                             |
| [链接静态库/动态库时搜索路径顺序](#lib) |
| [指针大乱斗](#pointer)                  |

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

> -l 指定头文件包含目录: b.c的头文件b.h
> > `gcc -l /home/caddy/c/cpp/h xxx.c /home/caddy/c/cpp/s/b.c -o xxx`

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
