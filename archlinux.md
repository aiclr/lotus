# arch linux

| [home](index.md#archlinux)                                     | Tools                                                    |
| :------------------------------------------------------------- | :------------------------------------------------------- |
| [systemd](#systemd)                                            | [nmap](#nmap)                                            |
| [systemd/User](#systemduser)                                   | [samba](#samba)                                          |
| [systemd/Timers](#systemdtimers) //  [OnCalendar](#oncalendar) | [podman](#podman)                                        |
| [systemd/Journal](#systemdjournal)                             | [docker 局域网访问](#局域网访问)                         |
| [开机时间检查](#boot)                                          |
| [pacman](#pacman) // [AUR](#aur)  //[降级软件包](#降级)        | [rabbitmq](#rabbitmq) // [rabbitmqadmin](#rabbitmqadmin) |
| [nginx](#nginx) // [vue & react nginx image](#nginx-for-h5)    | [xrandr 小米游戏本多屏输出](#xrandr)                     |

[top](#arch-linux) | [home](index.md)

# GRUB

> [win10 + archlinux 多系统手动添加引导参考](https://wiki.archlinux.org/title/GRUB#Windows_8/10_not_found)
> 首先查看分区 `lsblk --fs`\
> 挂载win10 boot所在分区 `mount /dev/sdd2 /mnt`\
> 查看`$hints_string`命令 `grub-probe --target=hints_string /mnt/EFI/Microsoft/Boot/bootmgfw.efi`\
> 查看`$fs_uuid`命令 `grub-probe --target=fs_uuid /mnt/EFI/Microsoft/Boot/bootmgfw.efi`(`lsblk --fs` 也能看到)\
> 编辑`/boot/grub/grub.cfg`
> ```shell
>   if [ "${grub_platform}" == "efi" ]; then
>   	menuentry "Microsoft Windows Vista/7/8/8.1 UEFI/GPT" {
>   		insmod part_gpt
>   		insmod fat
>   		insmod chain
>   		search --no-floppy --fs-uuid --set=root $hints_string $fs_uuid
>   		chainloader /EFI/Microsoft/Boot/bootmgfw.efi
>   	}
>   fi
> ```
> example:
> ```shell
> ### BEGIN /etc/grub.d/30_os-prober ###
> if [ "${grub_platform}" == "efi" ]; then
> 	menuentry "Microsoft Windows Vista/7/8/8.1/10 UEFI/GPT" {
> 		insmod part_gpt
> 		insmod fat
> 		insmod chain
> 		search --no-floppy --fs-uuid --set=root --hint-bios=hd3,gpt2 --hint-efi=hd3,g pt2 --hint-baremetal=ahci3,gpt2 C018-7605
> 		chainloader /EFI/Microsoft/Boot/bootmgfw.efi
> 	}
> fi
> ### END /etc/grub.d/30_os-prober ###
> ```

> 小米游戏本开机变慢发现是 `systemd-journal-flush.service` 耗时30秒+
> > 查看日志文件大小40M `journalctl -b -u systemd-journald`\
> > 查看启动耗时 `journalctl -b -u systemd-journal-flush.service`

[top](#arch-linux) | [home](index.md)

# boot

> 开机启动树 `systemd-cgls`\
> 开机耗时总览 `systemd-analyze`\
> 开机耗时详情 `systemd-analyze blame`\
> 开机启动依赖项 `systemd-analyze critical-chain`

> 小米游戏本开机变慢发现是 `systemd-journal-flush.service` 耗时30秒+
> > 查看日志文件大小40M `journalctl -b -u systemd-journald`\
> > 查看启动耗时 `journalctl -b -u systemd-journal-flush.service`

[top](#arch-linux) | [home](index.md)

# xrandr

> [archlinux-wiki 多显示器](https://wiki.archlinux.org/title/Xrandr)\
> [archlinux-wiki 显示器亮度](https://wiki.archlinux.org/title/Backlight#Xorg:_adjust_perceived_brightness_with_xrandr)\
> 安装 `pacman -S xorg-xrandr`\
> example
> > 帮助 `xrandr --help`\
> > 列出信息 `xrandr`\
> > 列出激活的监视器 `xrandr --listactivemonitors`\
> > 列出监视器 `xrandr --listmonitors`\
> > 列出显卡输出源 `xrandr --listproviders`\
> > 分辨率+刷新率 `xrandr --output eDP1 --brightness 0.77 --mode 1920x1080 --rate 60 --primary --auto --output "$extern" --left-of "$intern" --auto`

> 小米游戏本 
> > `type-c` 接口名称 `DP1`,可以正常双屏输出信号\
> > `hdmi` 接口名称 `HDMI-1`, 独立显卡 `GTX1060 Mobile`,驱动 `nvidia` 显示器无法检测到信号\
> > `fn` 键基本全部失效
>
> 简单脚本
> ```shell
> #!/bin/zsh
> intern=eDP1
> extern=DP1
> # 注意亮度值`0.00~1.00`
> if xrandr | grep "$extern disconnected"; then
> 	xrandr --output "$extern" --off --output "$intern" --brightness 0.77 --auto
> else
> 	xrandr --output "$intern" --brightness 0.77 --primary --auto --output "$extern" --left-of "$intern" --auto
> fi
> ```

[top](#arch-linux) | [home](index.md)

# nginx

> 挂载外部配置文件时，注意先创建 `nginx.conf` \
> 可以先启动一个不挂载外部配置的容器，将容器内配置文件复制到宿主机编辑修改
>
> run `docker run --name mynginx -d =p 8080:80 imageID`
> run
> ```shell
>  docker run --name mynginx -d -p8080:80 \
>        -v /root/nginx/html:/usr/share/nginx/html:ro \
>        -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
>        -v /root/nginx/conf.d:/etc/nginx/conf.d:ro \
>        -v /root/nginx/logs:/var/log/nginx \ 
>        nginx:latest 
> ```
> 进入nginx容器
> > alpine linux 默认使用 `/bin/sh`
> > > `docker container exec -it containerID /bin/sh` 
> >
> > 其他一般使用 `/bin/bash` 
> > > `docker container exec -it containerID /bin/bash`

> 复制容器内文件 `nginx.conf` 到宿主机 `/root/nginx/conf/nginx.conf`
> > `docker cp containerID:/etc/nginx/nginx.conf /root/nginx/conf/nginx.conf `

[top](#arch-linux) | [home](index.md)

## nginx for vue and react

> [nginx.conf](dockerfiles/nginx/nginx.conf) \
> [Dockerfile](dockerfiles/nginx/Dockerfile)
> ```dockerfile
> FROM nginx:stable-alpine
> 
> MAINTAINER bougainvilleas <bougainvilleas@qq.com>
> 
> WORKDIR app
> 
> ENV TZ=Asia/Shanghai \
>     LANG=en_US.UTF-8
> 
> COPY nginx.conf /etc/nginx/nginx.conf
> # 将npm build 生成的前端包拷贝 /usr/share/nginx/html/ 这个目录下面
> COPY dist  /usr/share/nginx/html/
> 
> RUN echo 'echo init ok!!'
> ```
> [build 脚本](dockerfiles/nginx/build.sh)
> ```shell
> #!/bin/bash
> 
> image_name="app"
> version="0.0.0"
> port="3000"
> 
> 
> echo -e "\n==> begin delete all container of " $image_name
> docker rm $(docker stop $(docker ps -a | grep $image_name | awk '{print $1}'))
> 
> echo -e "\n==> begin delete all images of " $image_name
> docker rmi -f $(docker images | grep $image_name | awk '{print $3}')
> 
> echo -e "\n==> begin build your images of " $image_name
> docker build -f Dockerfile -t $image_name:$version .
> 
> echo -e "\n==> begin to create a container of " $image_name
> docker run -d -p $port:$port --name=$image_name --privileged=true $image_name:$version
> 
> docker logs -f -t --tail 500 $(docker ps | grep $image_name | awk '{print $1}')
> 
> docker exec -it $(docker container ls | grep $image_name | awk '{print $1}') /bin/sh
> 
> docker stop $(docker ps -a | grep $image_name | awk '{print $1}')
> psid=$(docker ps -a | grep $image_name | awk '{print $1}')
> if [[ -n $psid ]]; then
>   docker rm $psid
> fi
> 
> echo -e "\n==> begin to package your image to tar file"
> docker save $image_name:$version > ../docker/$image_name-$version.tar
> 
> echo -e "\n==> begin load your images of " $image_name
> docker load < $image_name-$version.tar
> ```

[nginx](#nginx) | [top](#arch-linux) | [home](index.md)

# rabbitmq

> docker
> ```shell
> # Management Plugin rabbitmq default username and password of guest / guest
> docker run -d -p 5672:5672 -p 15672:15672 --name containerName imageID
> docker run -d -p 5672:5672 -p 15672:15672 --name containerName imageName:version
> docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management
> # go to container exit container will not stop
> docker exec -it containerID /bin/bash
> docker exec -it containerID /bin/sh
> # go to container exit container will stop
> docker attach containerID
> # exit container
> exit # 退出容器伪终端并关闭容器
> ctrl+d # 退出容器伪终端并关闭容器
> ctrl+c # 退出容器伪终端不关闭容器
> ctrl+p+ctrl+q #退出容器伪终端不关闭容器
> ```

[top](#arch-linux) | [home](index.md)

## rabbitmqadmin

```shell
# exchange
rabbitmqadmin -u username -p password declare exchange name=exchange type=topic
# queue
rabbitmqadmin -u username -p password declare queue name=queue  durable=true
# binding
rabbitmqadmin -u username -p password declare binding source=exchange destination=queue routing_key=key
```

[rabbitmq](#rabbitmq) | [top](#arch-linux) | [home](index.md)

# docker

> [Guides](https://docs.docker.com/get-started/overview/)\
> [Reference](https://docs.docker.com/reference/)

[top](#arch-linux) | [home](index.md)

## 局域网访问

> 开启远程 `vi /lib/systemd/system/docker.service`\
> 修改配置
> > ```properties
> > [Service]
> > ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
> > ```
>
> 重启docker 
> > `systemctl daemon-reload` \
> > `systemctl restart docker`
> 
> firewall-cmd 开启端口
> > `firewall-cmd --zone=public --add-port=2375/tcp --permanent`

[docker](#docker) | [top](#arch-linux) | [home](index.md)

# podman

> [podman 官方网站](https://podman.io) | [github](https://github.com/TomSweeneyRedHat/podman)
> 
> archlinux 安装 `pacman -S podman` \
> opensuse 安装 `zypper in podman` 
>
> [Rootless mode](https://man.archlinux.org/man/podman.1#Rootless_mode)
> ```shell
> usermod --add-subuids 10000-65535 caddy
> usermod --add-subgids 10000-65535 caddy
> # or
> echo caddy:10000:65536 >> /etc/subuid
> echo caddy:10000:65536 >> /etc/subgid
> ```
> 
> registry 加速配置 `etc/containers/registries.conf`
> ```properties
> [[registry]]
>    prefix = "docker.io"
>    location = "rjm3pmfv.mirror.aliyuncs.com"
> [[registry.mirror]]
>    location = "rjm3pmfv.mirror.aliyuncs.com"
> ```
> 
> [command](https://docs.podman.io/en/latest/Commands.html)
> ```shell
> podman --help
> podman <subcommand> --help
> man podman
> man podman-<subcommand>
> 
> podman search <search_term> # searching images
> podman search httpd --filter=is-official # searching images
> podman search httpd --f=is-official # searching images
> podman pull docker.io/library/httpd #  pulling some images
> podman images # list all images
> podman run -dt -p 8080:80/tcp docker.io/library/httpd # Running a container
> podman ps # Listing running containers
> podman ps -a # Listing all containers
> podman inspect -l | grep IPAddress # Inspecting a running container
> podman logs -l # Viewing the container’s logs
> podman top -l # Viewing the container’s pids
> podman stop -l # Stopping the container
> podman rm -l # Removing the container
> ```

[top](#arch-linux) | [home](index.md)

# samba

> [参考arch wiki](https://wiki.archlinux.org/title/Samba)

> 注意：优先配置 配置文件 `/etc/samba/smb.conf` \
> 配置文件官方样例 [smb.conf.default](https://git.samba.org/samba.git/?p=samba.git;a=blob_plain;f=examples/smb.conf.default;hb=HEAD) \
> [smb.conf](https://man.archlinux.org/man/smb.conf.5) 文档说明 \
> 自用配置文件[smb.conf](conf/smb.conf)
> 
> 配置完毕 进行安装:
> ```shell
> pacman -S samba
> # 创建 共享专用账户 
> useradd -m hi
> # 禁止登录 禁止 ssh login 
> usermod --shell /usr/bin/nologin --lock hi
> # samba 拥有自己的密码管理
> smbpasswd -a hi
> # 列出 samba 用户
> pdbedit -L -v
>
> # 启动测试
> systemctl start smb
> # 开机自启动
> systemctl enable smb
> ```
>
> ***Linux 客户端挂载 samba*** \
> `sudo mount //192.168.1.165/work /mnt -o username=fly,password=fly,iocharset=utf8`

[top](#arch-linux) | [home](index.md)

# pacman

> 下载的包本地保存目录 `/var/cache/pacman/pkg/`\
> mirrorlist `/etc/pacman.d/mirrorlist` \
> [配置文件](conf/pacman.conf) `/etc/pacman.conf` 
> > 更新时忽略包 `vim /etc/pacman.conf` 进行如下配置
> > ```properties
> > # Pacman won't upgrade packages listed in IgnorePkg and members of IgnoreGroup
> > IgnorePkg = intellij-idea-ultimate-edition intellij-idea-ultimate-edition-jre
> > ```
> 
> commands
> > 帮助
> > > `pacman -h`\
> > > `pacman -Sh`
> >
> > 跳过手动输入 `Y/N` 确认参数 `--noconfirm`
> >
> > 更新系统 `pacman -Syu` 
> >
> > **慎用** 强制更新系统 `pacman -Syy` 
> >
> > 查询 `pacman -Ss package_name` 
> >
> > 安装 `pacman -S package_name`
> >
> > 下载不安装 `pacman -Sw package_name` 
> >
> > 删除单个软件包，保留其全部已经安装的依赖关系
> > > `pacman -R package_name` 
> >
> > 删除指定软件包，及其所有没有被其他已安装软件包使用的依赖关系 
> > > `pacman -Rs package_name`
> >
> > 删除软件包和所有依赖这个软件包的程序 警告: 此操作是递归的，请小心检查，可能会一次删除大量的软件包 
> > > `pacman -Rsc package_name`
> >
> > 删除软件包，`-d` 跳过依赖版本检查,`-dd` 跳过所有检查 
> > >`pacman -Rdd package_name` 
> >
> > `pacman` 删除某些程序时会备份重要配置文件，在其后面加上`*.pacsave`扩展名。`-n` 选项可以删除这些文件
> > > `pacman -Rn package_name` \
> > > `pacman -Rsn package_name` 
> >
> > 从`/var/cache/pacman/pkg/` 本地包缓存目录中删除旧包 (`-cc` 删除全部包)
> > > `pacman -Sc` \
> > > `pacman -Scc`

[top](#arch-linux) | [home](index.md)

## 降级

> `pacman -U xxx` 不建议乱来 可以先在虚拟机上实验 
> 
> [参考](https://wiki.archlinux.org/title/Downgrading_packages) 
> 
> 低版本包检索地址[archlinux packages](https://archive.archlinux.org/packages/) 
> 
> Install a 'local' package 
> > `pacman -U /var/cache/pacman/pkg/xxx.pkg.tar.zst` 
> 
> Install a 'remote' package 
> > `pacman -U https://archive.archlinux.org/packages/f/ffmpeg/ffmpeg-2%3A4.4.1-1-x86_64.pkg.tar.zst`

[pacman](#pacman) | [top](#arch-linux) | [home](index.md)

## AUR

> 需要安装 `base-devel`、`git`
> > `pacman -S base-devel git` 
> 
> [搜索 AUR 包](https://aur.archlinux.org/packages) 
> 
> 使用`git` 下载AUR包
> > `git clone xxx.git` 
> 
> 安装命令 `makepkg -sirc`
> > To build the package and install needed dependencies, add the flag `makepkg -s/--syncdeps`
> >
> > To clean up leftover files and directories `makepkg -c/--clean` 
> >
> > makepkg to remove the make dependencies later, which are no longer needed `makepkg -r/--rmdeps`
> >
> > Once all dependencies are satisfied and the package builds successfully,\
> > a package file (pkgname-pkgver.pkg.tar.zst) will be created in the working directory.\
> > To install, use `-i/--install` (same as `pacman -U pkgname-pkgver.pkg.tar.zst`) `makepkg -i/--install`
> 
> example:
> > ```shell
> > git clone xxx.git
> > cd xxx
> > makepkg -sirc
> > ```

[pacman](#pacman) | [top](#arch-linux) | [home](index.md)

# nmap

> [arch wiki](https://wiki.archlinux.org/title/Nmap)\
> `pacman -S nmap`

> 使用方法
> > nmap [扫描类型](#扫描类型) [通用选项](#通用选项) [扫描目标](#扫描目标) \
> > `nmap -PS 192.168.1.0/24` 使用 TCP SYN 发现活跃主机 \
> > `nmap -sS -sV -n -p1-65535 -oX tcp.xml 192.168.1.0` 使用 TCP 方式扫描端口 \
> > `nmap -sS -sU -n -p1-65535 -oX udp.xml 192.168.1.0` 使用 UDP 方式扫描端口 \
> > `nmap -O 192.168.1.0/24` 判断操作系统 \
> > `nmap -sV 192.168.1.0/24` 判断服务版本

> 扫描结果端口状态说明
> > `open` 目标端口开启 \
> > `closed` 目标端口关闭 \
> > `filtered` 通常被防火墙拦截，无法判断目标端口开启与否 \
> > `unfiltered` 目标端口可以访问，但无法判断开启与否 \
> > `open|filtered` 无法确定端口是开启还是filtered \
> > `closed|filtered` 无法确定端口是关闭还是filtered

[top](#arch-linux) | [home](index.md)

### 端口分类

1. 公认端口well-known port: 0-1024 最常用端口，通常于协议绑定
2. 注册端口registered port: 1025-49151 最常用端口，通常于协议绑定
3. 动态或私有端口dynamic/private port: 49152-65535 最常用端口，通常于协议绑定
4. 特例: 端口还与协议相关。比如UDP端口53通常用于DNS查询、TCP端口53通常用于DNS记录迁移

### 扫描类型

#### -sT

```text
TCP conect()扫描，最基本的TCP扫描方式。
connect() 是一种系统调用，由操作系统提供，用来打开一个连接
如果目标端口有程序监听，connect() 就会成功返回，否则这个端口是不可达的。
无需 root 权限，任何 unix 用户都可以自由使用这个系统调用。
这种扫描很容易被检测到，在目标主机的日志中会记录大批的连接请求以及错误信息
```

#### -sS

```text
TCP 同步扫描 TCP SYN，因为不必全部打开一个 TCP 连接，被称为半开扫描 half-open。
发出一个TCP 同步包 SYN，然后等待回应。
如果返回 SYN|ACK(响应) 包
    表示目标端口正在监听，源主机马上发出一个RST(复位)数据包断开喝目标主机的连接，实际由操作系统内核自动完成
如果返回 RST 数据包
    表示目标端口没有监听程序。
好处：很少有系统能够把这记入系统日志。不过需要 root 权限 定制 SYN 数据包

```

#### -sU

```text
UDP 扫描，发送0字节UDP包，快速扫描 Windows 的UDP端口。
使用此扫描方法，可以获取目标主机上提供哪些UDP(用户数据报协议 RFC768)服务
nmap 首先向目标主机的每个端口发出一个0字节的UDP报
收到端口不可达的ICMP消息，端口就是关闭的，否则就是打开的
```

#### -sP

```text
ping 扫描，仅想获取哪些主机正在运行，通过向指定的网络内的每个IP地址发送ICMP echo 请求数据包即可。
注意,nmap 在任何情况下都会进行 ping 扫描，只有目标主机处于运行状态，才会进行后续的扫描
如果只想知道目标主机是否运行，不想进行其他扫描，才使用这个选项
```

#### -sA

```text
ACK扫描，TCP ACK扫描，当防火墙开启时，查看防火墙有未过滤某端口。
通常用来穿过防火墙规则集。有助于确定一个防火墙是功能比较完善的或是一个简单的包过滤程序，只是阻塞进入的SYN包。
这种扫描是向特定端口发送 ACK 包(使用随机的应答/序列号)
如果返回一个 RST包，这个端口就标记为 unfiltered 状态
如果什么都没有返回，或者返回一个不可达 ICMP消息，这个端口就归入 filtered 类。
注意 nmap 通常不输出 unfiltered 的端口，在输出中不显示所有被探测的端口
这种扫描方式不能找出处于打开状态的端口
```

#### -sW

```text
滑动窗口扫描，非常类似于 ACK 扫描，除了它有时可以检测到处于打开状态的端口。
因为滑动窗口的大小是不规则的，有些操作系统可以报告其大小
```

#### -sR

```text
RPC扫描，和其他不同的端口扫描方法结合使用
```

#### -b

```text
FTP 反弹攻击(FTP Bounce attack)外网用户通过 FTP渗透内网
```

[nmap](#nmap) | [top](#arch-linux) | [home](index.md)

### 通用选项

#### -P0

```text
nmap 扫描前 不Ping 目标主机
有些防火墙不允许ICMP echo 请求穿过，这个选项可以对这些网络进行扫描
```

#### -PT

```text
nmap 扫描前 使用 TCP ACK 包确定目标主机是否在运行
-PT 默认80.扫描之前，使用 TCP ping 确定哪些主机正在运行。
nmap不是通过发送 ICMP echo 请求包，然后等待响应来实现这种功能
而是向目标网络或者单一主机发出 TCP ACK包然后等待回应
如果主机证字啊运行就会返回 RST包，只有在目标网络/主机阻塞了ping包，而仍旧允许扫描时，这个选项才有效
对于非root用户，使用 connect() 系统调用来实现这个功能
使用 -PT 来设定目标端口 ，默认80 这个端口通常不会被过滤
```

#### -PS

```text
nmap使用 TCP SYN包进行扫描
对于 root 用户 这个选项让nmap 使用 SYN 包而不是 ACK包对目标主机进行扫描。
如果主机正在运行返回一个 RST包(或者一个 SYN/ACK包)
```

#### -PI

```text
nmap 进行ping扫描，设置这个选项，让nmap使用真正的ping（ICMP echo请求）来扫描目标主机是否正在运行。
这个选项让nmap发现正在运行的主机的同时，nmap也会对直接子网广播地址进行观察
直接子网广播地址一些外部可达的IP地址，把外部的包转换为一个内向的IP广播包，向一个计算机子网发送。
这些IP广播包应该删除，因为会造成拒绝服务攻击 例如 smurf
```

#### -PB

```text
结合 -PT 和 -PI功能，这是默认的 ping 扫描选项，使用 ACK（-PT）和 ICMP（-PI）两种扫描类型并行扫描
如果防火墙能够过滤其中一种包，之后使用这种方法，就能穿过防火墙
```

#### -O

```text
nmap扫描TCP/IP指纹特征，确定目标主机系统类型
```

#### -I

```text
反向标志扫描，扫描监听端口的用户
```

#### -f

```text
分片发送 SYN FIN Xmas Null 扫描的数据包
```

#### -v

```text
冗余模式扫描，可以得到扫描详细信息
```

#### -oN

```text
扫描结果重定向到文件
```

#### -resume

```text
使被中断的扫描可以继续
```

#### -iL

```text
扫描目录文件列表
```

#### -p

```text
指定端口或扫描端口列表及范围，默认扫秒 1-1024端口和/usr/share/nmap/nmap-services文件中指定的端口
例：
    -p 23 只扫描目标主机的23端口
    -p 20-30,139,60000- 扫描20~30端口，139端口，所有大于60000的端口
```

[nmap](#nmap) | [top](#arch-linux) | [home](index.md)

### 扫描目标

> 192.168.1.25 \
> 192.168.1.0/24 表示：192.168.1 网段所有ip \
> 192.168.*.* 表示 192.168.1.1~ 192.168.255.255 所有ip

[nmap](#nmap) | [top](#arch-linux) | [home](index.md)

# systemd

> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd)\
> [i3wm 普通用户关机 重新安装 polkit 即可](https://wiki.archlinux.org/title/Allow_users_to_shutdown)

> Example:
> > root
> > > `systemctl` = `systemctl --system` \
> > > `systemctl enable NetworkManager` = `systemctl --system enable NetworkManager` \
> > > `systemctl enable sshd` = `systemctl enable sshd --system` \
> > > `systemctl enable update-system.timer` = `systemctl --system enable update-system.timer` 
> > >
> > > poweroff 
> > > > `systemctl poweroff`
> > > 
> > > reboot
> > > > `systemctl reboot`
> > >
> > > Show system status
> > > > `systemctl status`
> > >
> > > List running units
> > > > `systemctl` or `systemctl list-units`
> > >
> > > List failed units
> > > > `systemctl --failed`
> > >
> > > List installed unit files
> > > > `systemctl list-unit-files`
> >
> > not root 参考[systemd/User](#systemduser) \
> > `systemctl --user` Connect to user service manager
> > > `systemctl --user enable mpd` \
> > > `systemctl --user start mpd`

[top](#arch-linux) | [home](index.md)

## systemd/User

> [systemd](#systemd) offers the ability to manage services under the user's control with a per-user systemd instance,enabling them to start, stop, enable, and disable their own user units\
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/User)\
> 参考[mpd](linux/arch/mpd.md)

## systemd/Timers

> There are many cron implementations, but none of them are installed by default as the base system uses **systemd/Timers** instead. \
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/Timers)\
> [systemd.timer](https://man.archlinux.org/man/systemd.timer.5)\
> [systemd.time 执行时间策略](https://man.archlinux.org/man/systemd.time.7)
> > [OnCalendar](#oncalendar)
> 
> [systemd.exec ](https://man.archlinux.org/man/systemd.exec.5)

> file path
> > /etc/systemd/system/update-system.timer \
> > /etc/systemd/system/update-system.service

### update-system.timer

```
[Unit]
Description=update system weekly

[Timer]
OnCalendar= Fri *-*-* 12:00:00

[Install]
WantedBy=timers.target
```

### update-system.service

```
[Unit]
Description=update system weekly

[Service]
ExecStart=pacman -S -y --noconfirm -u
```

> 查看定时任务
> > `systemctl list-timers` \
> > `systemctl list-timers --all`
>
> 开机激活定时器 
> > `systemctl enable update-system.timer` 
> 
> 取消开机激活定时器 
> > `systemctl disable update-system.timer` 
> 
> 手动激活定时器 
> > `systemctl start update-system.timer` 
> 
> 手动停止定时器
> > `systemctl stop update-system.timer`
> 
> 查看定时器状态 
> > `systemctl status update-system.timer`

### OnCalendar

> `systemd-analyze calendar weekly` \
> `systemd-analyze calendar "Mon *-*-* 00:00:00"`
> 注意 `/` 仅用于月份

| desc                                  |       word       |    周 年-月-日 时:分:秒     |
| :------------------------------------ | :--------------: | :-------------------------: |
| 每分钟                                |     minutely     |       `*-*-* *:*:00`        |
| 从0分钟起每5分钟                      |     minutely     |      `*-*-* *:00/5:00`      |
| 每小时                                |      hourly      |       `*-*-* *:00:00`       |
| 每天                                  |      daily       |      `*-*-* 00:00:00`       |
| 每月                                  |     monthly      |      `*-*-01 00:00:00`      |
| 每周                                  |      weekly      |    `Mon *-*-* 00:00:00`     |
| 每年                                  | yearly /annually |     `*-01-01 00:00:00`      |
| 每季度                                |    quarterly     | `*-01,04,07,10-01 00:00:00` |
| 每半年                                |   semiannually   |    `*-01,07-01 00:00:00`    |
| 九月倒数第一天0点                     |                  |     `*-09~01 00:00:00`      |
| 每年的九月倒数第七天起每过4天后的周一 |                  |  `Mon *-09~07/4 00:00:00`   |
| 下一个周一或周五                      |                  |  `Mon,Fri *-*-* 00:00:00`   |
| 周一到周五每天0点                     |                  |  `Mon..Fri *-*-* 00:00:00`  |

[timer](#systemdtimers) | [systemd](#systemd) | [top](#arch-linux) | [home](index.md)

## systemd/Journal

> linux 系统日志 \
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/Journal) \
> [opensuse man](https://www.freedesktop.org/software/systemd/man/journalctl.html#)

> Examples:
> > help
> > > `journalctl -h` \
> > > `journalctl --help`
>
> > 检索 `pacman` 相关日志
> > > `journalctl --grep=pacman`
> 
> > Show only the most recent journal entries, and continuously print new entries as they are appended to the journal. \
> > 显示最新日志，并连续输出
> > > `journalctl -f` \
> > > `journalctl --follow`
>  
> > Reverse output so that the newest entries are displayed first \
> > 反转输出 以便先显示最新的日志
> > > `journalctl -r` \
> > > `journalctl --reverse`
>  
> > Show all kernel logs from previous boot \
> > 显示上次启动的所有内核日志
> > > `journalctl -k -b -1`
>  
> > Show a live log display from a system service `kubelet.service` \
> > 实时显示 `kubelet` 日志
> > > `journalctl -f -u kubelet`
>  
> > 查看 `kubelet` 日志
> > > `journalctl _SYSTEMD_UNIT=kubelet.service`
> 
> > 查看进程号 `28097` 日志
> > > `journalctl _PID=28097`
>  
> > 查看进程号=28097 的 kubelet服务的日志 ***交集***
> > > `journalctl _SYSTEMD_UNIT=kubelet.service _PID=28097`

[systemd](#systemd) | [top](#arch-linux) | [home](index.md)