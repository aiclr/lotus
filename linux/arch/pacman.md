<div style="text-align: center;font-size: 40px;">pacman</div>

### 安装 `sudo pacman -S man-db`

### 卸载

```shell
# 删除单个软件包，保留其全部已经安装的依赖关系
pacman -R package_name
# 删除指定软件包，及其所有没有被其他已安装软件包使用的依赖关系
pacman -Rs package_name
# 要删除软件包和所有依赖这个软件包的程序 警告: 此操作是递归的，请小心检查，可能会一次删除大量的软件包。
pacman -Rsc package_name 
# 要删除软件包，但是不删除依赖这个软件包的其他程序
pacman -Rdd package_name 
# pacman 删除某些程序时会备份重要配置文件，在其后面加上*.pacsave扩展名。-n 选项可以删除这些文件：
pacman -Rn package_name
pacman -Rsn package_name
```

### journalctl 系统日志 `/var/log/journal`
### thunderbird 邮箱
### nautilus 目录图形化界面