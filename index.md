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

<div id='time' style="text-align: center;font-size: 40px;color: cyan;"></div>

## linux

| **linux**                                     | **arch**                            | **suse**                                 |
|:----------------------------------------------|:------------------------------------|:-----------------------------------------|
| [btrfs](linux/btrfs.md)                       | [安装记录](linux/arch/install.md)    |                                          |
| [users & groups](linux/user.md)               | [virtualbox安装](linux/arch/virtualbox.md)    |                                 |
| [shell](linux/shell.md)                       |                                     | [发行版](linux/suse/microos.md)          |
| [linux](linux/linux.md)                       | [pacman](linux/arch/pacman.md)      | [zypper](linux/suse/zypper.md)           |
| [lvm](linux/tools/lvm.md)                     | [i3](linux/arch/i3.md)              | [自启动脚本](linux/suse/init.md)           |
| [ohmyzsh](linux/tools/ohmyzsh.md)             | [系统监控工具](linux/arch/monitor.md)     | [默认凌晨三点六重启系统](linux/suse/rebootmg.md)    |
| [awk](linux/tools/awk.md)                     | [wifi爆破](linux/arch/aircrack-ng.md) | [Network file system](linux/suse/nfs.md) |
| [sed](linux/tools/sed.md)                     | [sddm login 主题](linux/arch/sddm.md) | [java version 管理工具](linux/suse/java.md) |
| [vim](linux/tools/vim.md)                     |                                     |                                          |
| [firewald 防火墙策略](linux/tools/firewall-cmd.md) |                                     |                                          |
| [vsftd文件服务器](linux/tools/vsftpd.md)           |                                     |                                          |
| [tar](linux/tools/tar.md)                     |                                     |                                          |
| [jar](linux/tools/jar.md)                     |                                     |                                          |
| [zip & gzip](linux/tools/zip.md)              |                                     |                                          |
| [tmux](linux/tools/tmux.md)                   |                                     |                                          |
| [chmod](linux/tools/chmod.md)                 |                                     |                                          |
| [grep](linux/tools/grep.md)                   |                                     |                                          |
| [less](linux/tools/less.md)                   |                                     |                                          |
| [进制转换](linux/decimal.md)                      |                                     |                                          |
| [journalctl 系统日志](linux/tools/journalctl.md)  |                                     |                                          |

## linux container

| **docker**                                                     | **podman**                           | **k8s**                                          |
|:---------------------------------------------------------------|:-------------------------------------|:-------------------------------------------------|
| [Docker registry 部署 与 自签证书](linux/lxc/registry/registry.md)    | [podman](linux/lxc/podman/podman.md) | [kubic 安装 k8s](linux/lxc/k8s/kubic.md)           |
| [rabbitmq](linux/lxc/docker/rabbitmq.md)                       |                                      | [kubectl 用法](linux/lxc/k8s/kubectl.md)           |
| [jre8 for alpine](linux/lxc/jre8/jre84alpine.md)               |                                      | [Dashboard UI 部署](linux/lxc/k8s/dashbord-ui.md)  |
| [jre7 for alpine](linux/lxc/jre7/jre74alpine.md)               |                                      | [RabbitMQ k8s 部署 脚本](linux/lxc/k8s/rabbitmq.md)  |
| [nginx](linux/lxc/docker/nginx.md)                             |                                      | [mysql k8s 部署 脚本](linux/lxc/k8s/mysql.yaml)      |
| [nginx for react & vue](linux/lxc/nginx/nginx4js.md)           |                                      | [redis k8s 部署 脚本](linux/lxc/k8s/redis.yaml)      |
| [Springboot Layering Docker Images](java/spring/boot/layer.md) |                                      | [RedisJSON k8s 部署 脚本](linux/lxc/k8s/rejson.yaml) |
| [docker 开启远程访问](linux/lxc/docker/docker.md)                    |                                      |                                                  |

## java

| **java**                                                | **String**                                      | **Spring**                                               | **Springboot**                                      |
|:--------------------------------------------------------|-------------------------------------------------|:---------------------------------------------------------|:----------------------------------------------------|
| [jvm 监控工具](jvm/tools.md) | [Jaccard 相似系数](java/string/Jaccard.md) | [spring cloud](java/spring/cloud/springcloud.md) | [Layering Docker Images](java/spring/boot/layer.md) |
| [Functional Programming & Currying](java/functional.md) | [Sorensen Dice 相似度系数](java/string/dice.md) | [eureka 配置说明](java/spring/cloud/eureka.md) | |
| [jshell java REPL](java/jshell.md) | [Levenshtein 莱文斯距离](java/string/Levenshtein.md) | [循环依赖](java/spring/cyclic-dependencies.md) | |
| [REST ful API](java/RESTfulAPI.md) | | [MultipartFile isEmpty 源码](java/spring/MultipartFile.md) | |
| [敏捷开发](java/TDD.md) | | | |
| [代理](java/proxy.md) | | | |
| [eclipse formatter](java/eclipse-codestyle.xml) | | | |
| [java 模块化 打包编译运行](java/java.md) ||||
| [java 模块化 jar](java/jar.md) ||||
| [java 模块化 jlink](java/jlink.md) ||||

## maven

| **maven**            |
|:---------------------|
| [maven](java/mvn.md) |

## gradle

| **gradle** |
|:-----------|
|            |

## jvm

| **jvm**                  |
|:-------------------------|
| [jvm 监控工具](jvm/tools.md) |



## git

| **git**                     | **git 使用 规范**                |
|:----------------------------|:-----------------------------|
| [git](git/git.md)           | [git 使用 规范](git/standard.md) |
| [ssh & gpg](git/ssh_gpg.md) | [git 分支 规范](git/standard.md) |
| [push](git/git_push.md) ||
| [tag](git/git_tag.md) ||
| [reflog](git/git_reflog.md) ||
| [config](git/git_config.md) ||


## mysql

| **mysql**                                  | **优化**                   |
|:-------------------------------------------|:-------------------------|
| [MySQL](mysql/database.md)                 | [分页查询优化](mysql/delay.md) |
| [一次隐式类型转换触发的bug](mysql/type-conversion.md) ||

## redis

| **redis**                     | **RedisJSON**                  |
|:------------------------------|:-------------------------------|
| [commands](redis/commands.md) | [RedisJSON](redis/rejson.md)   |
| [Redis](redis/redis.md)       | [JavaClient](redis/Jrejson.md) |

## C

| **C**           | **C Primer Plus** |
|:----------------|:------------------|
| [gcc](c/gcc.md) ||

## windows

| **windows**             |
|:------------------------|
| [端口占用](windows/port.md) |