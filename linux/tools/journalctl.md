
> [arch wiki](https://man.archlinux.org/man/journalctl.1) \
> [opensuse man](https://www.freedesktop.org/software/systemd/man/journalctl.html#)
> 
## example

```shell
# help
journalctl -h
journalctl --help
# Show only the most recent journal entries, and continuously print new entries as they are appended to the journal.
# 显示最新日志，并连续输出
journalctl -f
journalctl --follow
# Reverse output so that the newest entries are displayed first
# 反转输出 以便先显示最新的日志
journalctl -r 
journalctl --reverse 

# Show all kernel logs from previous boot
# 显示上次启动的所有内核日志
journalctl -k -b -1

# Show a live log display from a system service kubelet.service
# 实时显示 kubelet 日志
journalctl -f -u kubelet

# 查看 kubelet 日志
journalctl _SYSTEMD_UNIT=kubelet.service
# 查看进程号 28097 日志
journalctl _PID=28097
# 查看进程号=28097 的 kubelet服务的日志 交集
journalctl _SYSTEMD_UNIT=kubelet.service _PID=28097

```