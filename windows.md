# windows

| [home](index.md#windows)              |
| :------------------------------------ |
| [windows 处理端口占用](#windows-kill-process) |
| [linux lsof 处理端口占用](#lsof) |

## windows kill process

> 查找占用端口的PID `netstat -ano | findstr "$port"`
>
> 查找 PID 程序名 `tasklist | findstr “$PID”`
>
> 查找程序 `tasklist | findstr "YunDetectService.exe"`
>
> 结束进程 `taskkill /f /t /im "YunDetectService.exe"`

[top](#windows) | [home](index.md#windows)

## lsof

> 安装 `sudo pacman -S lsof`
> 查找占用端口的PID `lsof -i:8080`
> 结束进场 `kill -9 $PID`
