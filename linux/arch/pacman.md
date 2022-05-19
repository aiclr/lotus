<div style="text-align: center;font-size: 40px;">pacman</div>

### 下载的包本地保存目录 `/var/cache/pacman/pkg/`

### 更新系统 `pacman -Syu`

### 更新时忽略包 `vim /etc/pacman.conf`

```
# Pacman won't upgrade packages listed in IgnorePkg and members of IgnoreGroup
IgnorePkg = intellij-idea-ultimate-edition intellij-idea-ultimate-edition-jre
```

### 查询 `pacman -Ss man-db`

### 安装 `pacman -S man-db`

### 下载不安装 `pacman -Sw package_name`

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

### 清楚 本地 package

```shell
# To remove all the cached packages that are not currently installed, and the unused sync database, execute:
pacman -Sc
#To remove all files from the cache, use the clean switch twice, this is the most aggressive approach and will leave nothing in the cache directory:
pacman -Scc
```


### 降级 `pacman -U xxx` 不建议乱来 可以在先在虚拟机上实验

> [参考](https://wiki.archlinux.org/title/Downgrading_packages) \
> 低版本包地址[archlinux packages](https://archive.archlinux.org/packages/) \
> 下载安装 `pacman -U https://archive.archlinux.org/packages/f/ffmpeg/ffmpeg-2%3A4.4.1-1-x86_64.pkg.tar.zst`


```shell
# Install a 'local' package
pacman -U /var/cache/pacman/pkg/xxx.pkg.tar.zst
# Install a 'remote' package
pacman -U https://archive.archlinux.org/packages/f/ffmpeg/ffmpeg-2%3A4.4.1-1-x86_64.pkg.tar.zst
```

## AUR 安装 `makepkg -sirc`

> `pacman -S base-devel` \
> [搜索 AUR 包](https://aur.archlinux.org/packages) \
> `git` 下载AUR包 `git clone xxx.git` 


```shell
git clone xxx.git
cd xxx
makepkg -sirc


# To build the package and install needed dependencies, add the flag
makepkg -s/--syncdeps

# To clean up leftover files and directories
makepkg -c/--clean

# makepkg to remove the make dependencies later, which are no longer needed
makepkg -r/--rmdeps

# Once all dependencies are satisfied and the package builds successfully, a package file (pkgname-pkgver.pkg.tar.zst) will be created in the working directory. To install, use -i/--install (same as pacman -U pkgname-pkgver.pkg.tar.zst)
makepkg -i/--install

```