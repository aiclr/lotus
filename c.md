# c

| [home](index.md#c)                      |
| :-------------------------------------- |
| [gcc](#gcc)                             |
| [链接静态库/动态库时搜索路径顺序](#lib) |

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
