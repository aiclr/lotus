<script type="text/javascript">
    let startTime=new Date('2021/12/18 20:53:00');
    function getTime()
    {
        const ms = Math.floor((new Date() - startTime));
        const d = Math.floor(ms / 86400000);
        const h = Math.floor((ms-d*86400000) / 3600000);
        const m = Math.floor((ms-d*86400000-h*3600000) / 60000);
        const s = Math.floor((ms-d*86400000-h*3600000-m*60000) / 1000);

        const daysText=d.toString()+' days,';
        let hoursText="";
        let minutesText="";
        if(h>0)
            hoursText=h.toString()+' hours,';
        if(m>0)
            minutesText=m.toString()+' minutes and ';
        document.getElementById("time").innerHTML=daysText+hoursText+minutesText+s.toString()+' seconds have passed';
    }
    setInterval(getTime,1000);
</script>

<div id='time' style="text-align: center;font-size: 24px;color: cyan;"></div>

## top

- [github-pages](https://bougainvilleas.github.io/lotus/)
- [linux](#linux)
- [java](#java)
- [go](#go)
- [git](#git)
- [archlinux](#archlinux)
- [C](#c)
- [redis](#redis)
- [mysql](#mysql)
- [build tools](#build-tools)
- [windows](#windows)
- [idea](#IntelliJIdea)

## linux

| [top](#top)                                        | **arch**                                   | **suse**                                         | **docker**                                                         | **k8s**                                              |
| :------------------------------------------------- | :----------------------------------------- | :----------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------- |
| [btrfs](linux/btrfs.md)                            | [安装记录](linux/arch/install.md)          | [发行版](linux/suse/microos.md)                  | [Docker registry 部署 与 自签证书](linux/lxc/registry/registry.md) | [kubic 安装 k8s](linux/lxc/k8s/kubic.md)             |
| [users & groups](linux/user.md)                    | [virtualbox安装](linux/arch/virtualbox.md) | [zypper](linux/suse/zypper.md)                   | [rabbitmq](linux/lxc/docker/rabbitmq.md)                           | [kubectl 用法](linux/lxc/k8s/kubectl.md)             |
| [shell](linux/shell.md)                            |                                            | [自启动脚本](linux/suse/init.md)                 | [jre8 for alpine](linux/lxc/jre8/jre84alpine.md)                   | [Dashboard UI 部署](linux/lxc/k8s/dashbord-ui.md)    |
| [linux](linux/linux.md)                            |                                            | [默认凌晨三点六重启系统](linux/suse/rebootmg.md) | [jre7 for alpine](linux/lxc/jre7/jre74alpine.md)                   | [RabbitMQ k8s 部署 脚本](linux/lxc/k8s/rabbitmq.md)  |
| [lvm](linux/tools/lvm.md)                          | [i3](linux/arch/i3.md)                     | [Network file system](linux/suse/nfs.md)         | [nginx](linux/lxc/docker/nginx.md)                                 | [mysql k8s 部署 脚本](linux/lxc/k8s/mysql.yaml)      |
| [ohmyzsh](linux/tools/ohmyzsh.md)                  | [系统监控工具](linux/arch/monitor.md)      | [java version 管理工具](linux/suse/java.md)      | [nginx for react & vue](linux/lxc/nginx/nginx4js.md)               | [redis k8s 部署 脚本](linux/lxc/k8s/redis.yaml)      |
| [awk](linux/tools/awk.md)                          | [wifi爆破](linux/arch/aircrack-ng.md)      |                                                  | [Springboot Layering Docker Images](java/spring/boot/layer.md)     | [RedisJSON k8s 部署 脚本](linux/lxc/k8s/rejson.yaml) |
| [sed](linux/tools/sed.md)                          | [sddm login 主题](linux/arch/sddm.md)      |                                                  |
| [vim](linux/tools/vim.md)                          | [mpv 视频播放](linux/arch/mpv.md)          |                                                  |
| [firewald 防火墙策略](linux/tools/firewall-cmd.md) | [mpd mpc 音频播放](linux/arch/mpd.md)      |                                                  |
| [vsftd文件服务器](linux/tools/vsftpd.md)           |                                            |                                                  |
| [tar](linux/tools/tar.md)                          |                                            |                                                  |
| [jar](linux/tools/jar.md)                          |                                            |                                                  |
| [zip & gzip](linux/tools/zip.md)                   |                                            |                                                  |
| [tmux](linux/tools/tmux.md)                        |                                            |                                                  |
| [chmod](linux/tools/chmod.md)                      |                                            |                                                  |
| [grep](linux/tools/grep.md)                        |                                            |                                                  |
| [less](linux/tools/less.md)                        |                                            |                                                  |
| [进制转换](linux/decimal.md)                       |                                            |                                                  |

## java

| [top](#top)                                                                                        | **String**                                           | **Spring**                                                 | **Springboot**                                      |
| :------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------- |
| [jvm 监控工具](jvm/tools.md)                                                                       | [Jaccard 相似系数](java/string/Jaccard.md)           | [spring cloud](java/spring/cloud/springcloud.md)           | [Layering Docker Images](java/spring/boot/layer.md) |
| [Functional Programming & Currying](java/functional.md)                                            | [Sorensen Dice 相似度系数](java/string/dice.md)      | [eureka 配置说明](java/spring/cloud/eureka.md)             |                                                     |
| [jshell java REPL](java/jshell.md)                                                                 | [Levenshtein 莱文斯距离](java/string/Levenshtein.md) | [循环依赖](java/spring/cyclic-dependencies.md)             |                                                     |
| [REST ful API](java/RESTfulAPI.md)                                                                 |                                                      | [MultipartFile isEmpty 源码](java/spring/MultipartFile.md) |                                                     |
| [TDD测试驱动开发](java/TDD.md)                                                                     |                                                      |                                                            |                                                     |
| [Spock测试框架](https://spockframework.org)                                                        |                                                      |                                                            |                                                     |
| [代理](java/proxy.md)                                                                              |                                                      |                                                            |                                                     |
| [eclipse formatter](java/eclipse-codestyle.xml)                                                    |                                                      |                                                            |                                                     |
| [java 模块化 打包编译运行](java/java.md)                                                           |                                                      |                                                            |                                                     |
| [java 模块化 jar](java/jar.md)                                                                     |                                                      |                                                            |                                                     |
| [java 模块化 jlink](java/jlink.md)                                                                 |                                                      |                                                            |                                                     |
| [Java泛型的优点、缺点以及丑陋之处](http://www.agiledeveloper.com/articles/GenericsInJavaPartI.pdf) |                                                      |                                                            |                                                     |
| [VisualVM](jvm/visualvm.md)                                                                        |

## go

| [top](#top)                 |
| :-------------------------- |
| [go command](go.md#command) |

## git

| [top](#top)             | [reference](https://git-scm.com/docs/) | [frequently](git.md#frequently) |
| :---------------------- | :------------------------------------- | :------------------------------ |
| [clone](git.md#clone)   | [查看其他分支文件](git.md#show)        | [ssh](git.md#ssh)               |
| [branch](git.md#branch) | [初始化仓库](git.md#init)              | [gpg](git.md#gpg)               |
| [commit](git.md#commit) | [gitlab新建仓库](git.md#gitlab)        | [config](git.md#config)         |
| [merge](git.md#merge)   | [git-flow](git.md#git-flow)            |
| [rebase](git.md#rebase) | [reflog](git.md#reflog)                |
| [push](git.md#push)     |
| [tag](git.md#tag)       |

## spring-framework

| [top](#top) |             编译源码              |
| :---------- | :------------------------------: |
|             | [5.3.x](spring-framework.md#53x) |

## archlinux

| [top](#top)                                                                                 | Tools                                                                            |
| :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| [systemd](archlinux.md#systemd)                                                             | [nmap](archlinux.md#nmap)                                                        |
| [systemd/User](archlinux.md#systemduser)                                                    | [samba](archlinux.md#samba)                                                      |
| [systemd/Timers](archlinux.md#systemdtimers) //  [OnCalendar](archlinux.md#oncalendar)      | [podman](archlinux.md#podman)                                                    |
| [systemd/Journal](archlinux.md#systemdjournal)                                              | [docker 局域网访问](archlinux.md#局域网访问)                                     |
| [开机时间检查](archlinux.md#boot)                                                             | [多个X视窗会话](archlinux.md#startx)
| [pacman](archlinux.md#pacman) // [AUR](archlinux.md#aur)  //[降级软件包](archlinux.md#降级)   | [rabbitmq](archlinux.md#rabbitmq) // [rabbitmqadmin](archlinux.md#rabbitmqadmin) |
| [nginx](archlinux.md#nginx) // [vue & react nginx image](archlinux.md#nginx-for-h5)         | [xrandr 小米游戏本多屏输出](archlinux.md#xrandr)                                 |
| [GRUB](archlinux.md#grub)                                                                   |
| [vscode settings.json](conf/settings.json)                                                  |

## C

| [top](#top)                                 |
| :------------------------------------------ |
| [gcc](c.md#gcc)                             |
| [gdb](c.md#gdb)                             |
| [keyword](c.md#keyword)                     |
| [链接静态库/动态库时搜索路径顺序](c.md#lib)      |
| [指针大乱斗](c.md#pointer)                   |

## redis

| [top](#top) | [Redis](redis.md#redis)       | [rrejson](redis.md#redisjson)                       |
| :---------- | :---------------------------- | :-------------------------------------------------- |
|             | [官方网址](redis.md#official) | [rejson docker & podman](redis.md#docker-or-podman) |
|             | [docker](redis.md#docker)     | [rejson k8s](redis.md#rejson-k8s)                   |
|             | [podman](redis.md#podman)     | [rejson commands](redis.md#redisjson-commands)      |
|             | [k8s](redis.md#k8s)           | [JRedisJSON](redis.md#jrejson)                      |
|             | [commands](redis.md#commands) |

## mysql

| [top](#top)                                                                                                     |                                                                                   |
| :-------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [mysql错误码](https://dev.mysql.com/doc/mysql-errors/5.7/en/server-error-reference.html#error_er_no_such_table) | [mysql5.7 sql_mode 默认开启 ONLY_FULL_GROUP_BY 问题](mysql.md#ONLY_FULL_GROUP_BY) |
|                                                                                                                 | [commands](mysql.md#commands)                                                     |
|                                                                                                                 | [mysql5.7 类型隐式转换](mysql.md#type-conversion)                                 |
|                                                                                                                 | [优化分页查询](mysql.md#分页查询)                                                 |

## build tools

| [top](#top) | [maven](maven.md#maven)                               | [gradle](gradle.md#gradle) |
| :---------- | :---------------------------------------------------- | :------------------------- |
|             | [安装目录说明](maven.md#安装目录说明)                     | [升级gradle版本](gradle.md#upgrade) |
|             | [生命周期](maven.md#生命周期)                            | [jvm参数配置](gradle.md#gradleproperties) |
|             | [命令行与生命周期](maven.md#命令行与生命周期)              |  [构建环境](gradle.md#build-environment) |
|             | [总结](maven.md#总结)                                  |
|             | [插件](maven.md#插件)                                  |
|             | [传递性依赖和以来范围](maven.md#传递性依赖和以来范围)       |
|             | [多模块](maven.md#多模块)                              |
|             | [一些错误](maven.md#error)                             |

## IntelliJIdea

| [top](#top)                  |
|:-----------------------------|
| [快捷键](idea.md#shortcut-keys) |

## windows

| [top](#top)                                     |
| :---------------------------------------------- |
| [处理端口占用](windows.md#windows-kill-process) |
