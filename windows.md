# windows

| [home](index.md#windows)              |
| :------------------------------------ |
| [处理端口占用](#windows-kill-process) |


## windows kill process

> 查找占用端口的PID `netstat -ano | findstr "$port"`
>
> 查找 PID 程序名 `tasklist | findstr “$PID”`
>
> 查找程序 `tasklist | findstr "YunDetectService.exe"`
>
> 结束进程 `taskkill /f /t /im "YunDetectService.exe"`

[top](#windows) | [home](index.md#windows)