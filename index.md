<script type="text/javascript">
    let startTime=new Date('2021/12/18 20:53:00');

    function getTime()
    {
        var ms = Math.floor((new Date() - startTime));
        var d = Math.floor(ms / 86400000);
        var h = Math.floor((ms-d*86400000) / 3600000);
        var m = Math.floor((ms-d*86400000-h*3600000) / 60000);
        var s = Math.floor((ms-d*86400000-h*3600000-m*60000) / 1000);

        var daysText="";
        var hoursText="";
        var minutesText="";
        if(d>0)
            daysText=d.toString()+' days,';
        if(h>0)
            hoursText=h.toString()+' hours,';
        if(m>0)
            minutesText=m.toString()+' minutes and ';
        var showText=daysText+hoursText+minutesText+s.toString()+' seconds have passed';

        document.getElementById("time").innerHTML=d.toString()+'天'+h.toString()+'小时'+m.toString()+'分'+s.toString()+'秒';
        document.getElementById("time2").innerHTML=showText;
    }
    setInterval(getTime,1000);
</script>

<div id='time' style="text-align: center;font-size: 40px;color: cyan;"></div>

## linux

- [linux](linux/linux.md)
- [shell](linux/shell.md)
- [archlinux](linux/arch/index.md)
- [Linux container](linux/lxc/index.md)
- opensuse
    - [自启动脚本](linux/suse/init.md)
- tools
    - [vim](linux/tools/vim.md)
    - [firewald 防火墙策略](linux/tools/firewall-cmd.md)
    - [vsftd文件服务器](linux/tools/vsftpd.md)
    - [tar](linux/tools/tar.md)
    - [jar](linux/tools/jar.md)
    - [zip & gzip](linux/tools/zip.md)
    - [tmux](linux/tools/tmux.md)
    - [chmod](linux/tools/chmod.md)
    - [grep](linux/tools/grep.md)
    - [less](linux/tools/less.md)
    - [sed](linux/tools/sed.md)
    - [awk](linux/tools/awk.md)
    - [ohmyzsh](linux/tools/ohmyzsh.md)
    - [lvm](linux/tools/lvm.md)


## [java](java/index.md)

- [jvm](java/jvm/index.md)
- [jshell java REPL](java/jshell.md)
- String
  - [Jaccard 相似系数](java/string/Jaccard.md)
  - [Sorensen Dice 相似度系数](java/string/dice.md)
  - [Levenshtein 莱文斯距离](java/string/Levenshtein.md)
- spring
    - boot
        - [Layering Docker Images](java/spring/boot/layer.md)
    - cloud
        - [spring cloud](java/spring/cloud/springcloud.md)
        - [eureka 配置说明](java/spring/cloud/eureka.md)

## git

- [git](git/git.md)
- [ssh & gpg](git/ssh_gpg.md)

## mysql

- [MySQL](mysql/database.md)
- [一次隐式类型转换触发的bug](mysql/type-conversion.md)