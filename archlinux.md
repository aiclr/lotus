# <center> arch linux



| [home](index.md#center-archlinux)         |                                  |
| :---------------------------------------- | :------------------------------- |
| [systemd](#center-systemd)                |
| [systemd/User](#center-systemduser)       |
| [systemd/Timers](#center-systemdtimers)   |
|                                           | [OnCalendar](#center-oncalendar) |
| [systemd/Journal](#center-systemdjournal) |

# <center> systemd

> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd)

> Example:
> > root
> > > `systemctl` = `systemctl --system` \
> > > `systemctl enable NetworkManager` = `systemctl --system enable NetworkManager` \
> > > `systemctl enable sshd` = `systemctl enable sshd --system` \
> > > `systemctl enable update-system.timer` = `systemctl --system enable update-system.timer` 
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
> > not root 参考[systemd/User](#center-systemduser) \
> > `systemctl --user` Connect to user service manager
> > > `systemctl --user enable mpd` \
> > > `systemctl --user start mpd`

[top](#center-arch-linux) | [home](index.md)

## <center> systemd/User

> [systemd](#center-systemd) offers the ability to manage services under the user's control with a per-user systemd instance,enabling them to start, stop, enable, and disable their own user units\
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/User)\
> 参考[mpd](linux/arch/mpd.md)

## <center> systemd/Timers

> There are many cron implementations, but none of them are installed by default as the base system uses **systemd/Timers** instead. \
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/Timers)\
> [systemd.timer](https://man.archlinux.org/man/systemd.timer.5)\
> [systemd.time 执行时间策略](https://man.archlinux.org/man/systemd.time.7)
> > [OnCalendar](#center-oncalendar)
> 
> [systemd.exec ](https://man.archlinux.org/man/systemd.exec.5)


<details><summary> Files: update-system.timer & update-system.service </summary>

> file path
> > /etc/systemd/system/update-system.timer \
> > /etc/systemd/system/update-system.service

#### update-system.timer

```
[Unit]
Description=update system weekly

[Timer]
OnCalendar= Fri *-*-* 12:00:00

[Install]
WantedBy=timers.target
```

#### update-system.service

```
[Unit]
Description=update system weekly

[Service]
ExecStart=pacman -S -y --noconfirm -u
```
</details>

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
> 手动激活定时器
> > `systemctl stop update-system.timer`
> 
> 查看定时器状态 
> > `systemctl status update-system.timer`

### <center> OnCalendar

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

[timer](#center-systemdtimers) | [systemd](#center-systemd) | [top](#center-arch-linux) | [home](index.md)

## <center> systemd/Journal

> linux 系统日志 \
> [archlinux Wiki](https://wiki.archlinux.org/title/Systemd/Journal) \
> [opensuse man](https://www.freedesktop.org/software/systemd/man/journalctl.html#)

> Examples:
> > help
> > > `journalctl -h` \
> > > `journalctl --help`
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

[systemd](#center-systemd) | [top](#center-arch-linux) | [home](index.md)