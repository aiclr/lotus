<script type="text/javascript">
    let startTime=new Date('2021/12/18 20:53:00');
    function getTime()
    {
        var ms = Math.floor((new Date() - startTime));
        var d = Math.floor(ms / 86400000);
        var h = Math.floor((ms-d*86400000) / 3600000);
        var m = Math.floor((ms-d*86400000-h*3600000) / 60000);
        var s = Math.floor((ms-d*86400000-h*3600000-m*60000) / 1000);

        var daysText=d.toString()+' days,';
        var hoursText="";
        var minutesText="";
        if(h>0)
            hoursText=h.toString()+' hours,';
        if(m>0)
            minutesText=m.toString()+' minutes and ';
        var showText=daysText+hoursText+minutesText+s.toString()+' seconds have passed';
        document.getElementById("time").innerHTML=showText;
    }
    setInterval(getTime,1000);
</script>

<div id='time' style="text-align: center;font-size: 40px;color: cyan;"></div>

## linux

| **linux**               | **arch**                            | **suse**                       |
|:------------------------|:------------------------------------|:-------------------------------|
| [shell](linux/shell.md) | [安装记录](linux/arch/install.md)       | [发行版](linux/suse/microos.md)   |
| [linux](linux/linux.md) | [pacman](linux/arch/pacman.md)      | [zypper](linux/suse/zypper.md) |
|                         | [i3](linux/arch/i3.md)              | [自启动脚本](linux/suse/init.md)    |
|                         | [系统监控工具](linux/arch/monitor.md)     |                                |
|                         | [wifi爆破](linux/arch/aircrack-ng.md) |                                |
|                         | [sddm login 主题](linux/arch/sddm.md) |                                |

## linux container

| **docker**                                                     | **podman**                           | **k8s**                                         |
|:---------------------------------------------------------------|:-------------------------------------|:------------------------------------------------|
| [Docker registry 部署 与 自签证书](linux/lxc/registry/registry.md)    | [podman](linux/lxc/podman/podman.md) | [kubic 安装 k8s](linux/lxc/k8s/kubic.md)          |
| [rabbitmq](linux/lxc/docker/rabbitmq.md)                       |                                      | [kubectl 用法](linux/lxc/k8s/kubectl.md)          |
| [jre8 for alpine](linux/lxc/jre8/jre84alpine.md)               |                                      | [Dashboard UI 部署](linux/lxc/k8s/dashbord-ui.md) |
| [jre7 for alpine](linux/lxc/jre7/jre74alpine.md)               |                                      | [RabbitMQ k8s 部署 脚本](linux/lxc/k8s/rabbitmq.md) |
| [nginx](linux/lxc/docker/nginx.md)                             |                                      | [mysql k8s 部署 脚本](linux/lxc/k8s/mysql.yaml)     |
| [nginx for react & vue](linux/lxc/nginx/nginx4js.md)           |                                      | [redis k8s 部署 脚本](linux/lxc/k8s/redis.md)       |
| [Springboot Layering Docker Images](java/spring/boot/layer.md) |                                      |                                                 |

## linux tools

| **linux tools**                               |
|:----------------------------------------------|
| [vim](linux/tools/vim.md)                     |
| [firewald 防火墙策略](linux/tools/firewall-cmd.md) |
| [vsftd文件服务器](linux/tools/vsftpd.md)           |
| [tar](linux/tools/tar.md)                     |
| [jar](linux/tools/jar.md)                     |
| [zip & gzip](linux/tools/zip.md)              |
| [tmux](linux/tools/tmux.md)                   |
| [chmod](linux/tools/chmod.md)                 |
| [grep](linux/tools/grep.md)                   |
| [less](linux/tools/less.md)                   |
| [sed](linux/tools/sed.md)                     |
| [awk](linux/tools/awk.md)                     |
| [ohmyzsh](linux/tools/ohmyzsh.md)             |
| [lvm](linux/tools/lvm.md)                     |

## java

| **java**                                                | **String**                                      | **Spring**                                       | **Springboot**                                      |
|:--------------------------------------------------------|-------------------------------------------------|:-------------------------------------------------|:----------------------------------------------------|
| [jvm 监控工具](jvm/tools.md)                                | [Jaccard 相似系数](java/string/Jaccard.md)          | [spring cloud](java/spring/cloud/springcloud.md) | [Layering Docker Images](java/spring/boot/layer.md) |
| [Functional Programming & Currying](java/functional.md) | [Sorensen Dice 相似度系数](java/string/dice.md)      | [eureka 配置说明](java/spring/cloud/eureka.md)       |                                                     |
| [jshell java REPL](java/jshell.md)                      | [Levenshtein 莱文斯距离](java/string/Levenshtein.md) |                                                  |                                                     |
| [REST ful API](RESTfulAPI.md)                           |                                                 |                                                  |                                                     |
| [敏捷开发](TDD.md)                                          |                                                 |                                                  |                                                     |

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

| **git**                     |
|:----------------------------|
| [git](git/git.md)           |
| [ssh & gpg](git/ssh_gpg.md) |

## mysql

| **mysql**                                  |
|:-------------------------------------------|
| [MySQL](mysql/database.md)                 |
| [一次隐式类型转换触发的bug](mysql/type-conversion.md) |

## C

| **C**           | **C Primer Plus** |
|:----------------|:------------------|
| [gcc](c/gcc.md) ||