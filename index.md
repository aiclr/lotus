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
- [git](#git)
- [mysql](#mysql)
- [archlinux](#archlinux)
- [C](#c)
- [redis](#redis)
- [build tools](#build-tools)
- [windows](#windows)

## linux

| **linux**                                          | **arch**                                   | **suse**                                         | **docker**                                                         | **podman**                           | **k8s**                                              |
| :------------------------------------------------- | :----------------------------------------- | :----------------------------------------------- | :----------------------------------------------------------------- | :----------------------------------- | :--------------------------------------------------- |
| [btrfs](linux/btrfs.md)                            | [安装记录](linux/arch/install.md)          | [发行版](linux/suse/microos.md)                  | [Docker registry 部署 与 自签证书](linux/lxc/registry/registry.md) | [podman](linux/lxc/podman/podman.md) | [kubic 安装 k8s](linux/lxc/k8s/kubic.md)             |
| [users & groups](linux/user.md)                    | [virtualbox安装](linux/arch/virtualbox.md) | [zypper](linux/suse/zypper.md)                   | [rabbitmq](linux/lxc/docker/rabbitmq.md)                           |                                      | [kubectl 用法](linux/lxc/k8s/kubectl.md)             |
| [shell](linux/shell.md)                            | [samba 文件共享](linux/arch/samba.md)      | [自启动脚本](linux/suse/init.md)                 | [jre8 for alpine](linux/lxc/jre8/jre84alpine.md)                   |                                      | [Dashboard UI 部署](linux/lxc/k8s/dashbord-ui.md)    |
| [linux](linux/linux.md)                            | [pacman](linux/arch/pacman.md)             | [默认凌晨三点六重启系统](linux/suse/rebootmg.md) | [jre7 for alpine](linux/lxc/jre7/jre74alpine.md)                   |                                      | [RabbitMQ k8s 部署 脚本](linux/lxc/k8s/rabbitmq.md)  |
| [lvm](linux/tools/lvm.md)                          | [i3](linux/arch/i3.md)                     | [Network file system](linux/suse/nfs.md)         | [nginx](linux/lxc/docker/nginx.md)                                 |                                      | [mysql k8s 部署 脚本](linux/lxc/k8s/mysql.yaml)      |
| [ohmyzsh](linux/tools/ohmyzsh.md)                  | [系统监控工具](linux/arch/monitor.md)      | [java version 管理工具](linux/suse/java.md)      | [nginx for react & vue](linux/lxc/nginx/nginx4js.md)               |                                      | [redis k8s 部署 脚本](linux/lxc/k8s/redis.yaml)      |
| [awk](linux/tools/awk.md)                          | [wifi爆破](linux/arch/aircrack-ng.md)      |                                                  | [Springboot Layering Docker Images](java/spring/boot/layer.md)     |                                      | [RedisJSON k8s 部署 脚本](linux/lxc/k8s/rejson.yaml) |
| [sed](linux/tools/sed.md)                          | [sddm login 主题](linux/arch/sddm.md)      |                                                  | [docker 开启远程访问](linux/lxc/docker/docker.md)                  |
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

| **java**                                                                                           | **String**                                           | **Spring**                                                 | **Springboot**                                      |
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


## git

| **git**                     | **git 使用 规范**                |
| :-------------------------- | :------------------------------- |
| [git](git/git.md)           | [git 使用 规范](git/standard.md) |
| [ssh & gpg](git/ssh_gpg.md) | [git 分支 规范](git/standard.md) |
| [push](git/git_push.md)     |                                  |
| [tag](git/git_tag.md)       |                                  |
| [reflog](git/git_reflog.md) |                                  |
| [config](git/git_config.md) |                                  |


## mysql

| **mysql**                                                                                                       | **优化**                       |
| :-------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| [MySQL](mysql/database.md)                                                                                      | [分页查询优化](mysql/delay.md) |
| [一次隐式类型转换触发的bug](mysql/type-conversion.md)                                                           |                                |
| [mysql5.7 sql_mode 默认开启 ONLY_FULL_GROUP_BY 问题](mysql/ONLY_FULL_GROUP_BY.md)                               |                                |
| [mysql错误码](https://dev.mysql.com/doc/mysql-errors/5.7/en/server-error-reference.html#error_er_no_such_table) |                                |

## archlinux

| [top](#top)                                    |                                       |       |           Tools           |
| :--------------------------------------------- | :------------------------------------ | :---: | :-----------------------: |
| [systemd](archlinux.md#systemd)                |                                       |       | [nmap](archlinux.md#nmap) |
| [systemd/User](archlinux.md#systemduser)       |                                       |       |                           |
| [systemd/Timers](archlinux.md#systemdtimers)   |                                       |       |                           |
|                                                | [OnCalendar](archlinux.md#oncalendar) |       |                           |
| [systemd/Journal](archlinux.md#systemdjournal) |                                       |       |                           |

## C

| [top](#top)                                 |
| :------------------------------------------ |
| [gcc](c.md#gcc)                             |
| [链接静态库/动态库时搜索路径顺序](c.md#lib) |

## redis

| [top](#top) | [Redis](redis.md#redis)       | [rrejson](redis.md#redisjson)                       |
| :---------- | :---------------------------- | :-------------------------------------------------- |
|             | [官方网址](redis.md#official) | [rejson docker & podman](redis.md#docker-or-podman) |
|             | [docker](redis.md#docker)     | [rejson k8s](redis.md#rejson-k8s)                   |
|             | [podman](redis.md#podman)     | [rejson commands](redis.md#redisjson-commands)      |
|             | [k8s](redis.md#k8s)           | [JRedisJSON](redis.md#jrejson)                      |
|             | [commands](redis.md#commands) |

## build tools

| [top](#top) | [maven](maven.md#maven)                       | [gradle](gradle.md#gradle) |
| :---------- | :-------------------------------------------- | :------------------------- |
|             | [安装目录说明](#安装目录说明)                 |
|             | [生命周期](#生命周期)                         |
|             | [命令行与生命周期](#命令行与生命周期)         |
|             | [总结](#总结)                                 |
|             | [插件](#插件)                                 |
|             | [传递性依赖和以来范围](#传递性依赖和以来范围) |
|             | [多模块](#多模块)                             |
|             | [一些错误](#error)                            |

## windows

| [top](#top)                                     |
| :---------------------------------------------- |
| [处理端口占用](windows.md#windows-kill-process) |
