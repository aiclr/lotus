<div style="text-align: center;font-size: 40px;">samba for ios & windows</div>

> iphone 文件 直接连接的文件服务器
> 
> [参考arch wiki](https://wiki.archlinux.org/title/Samba)
> 
> 先配置 配置文件 [/etc/samba/smb.conf](smb.conf)

## 注意

> 先配置 `/etc/samba/smb.conf`

## 安装配置

```shell
pacman -S samba
# 创建 共享专用账户
useradd -m hi
# 禁止登录 禁止 ssh login 
usermod --shell /usr/bin/nologin --lock hi
# samba 自己的密码管理
smbpasswd -a hi
# 列出 samba 用户
pdbedit -L -v

```

## 先配置 **/etc/samba/smb.conf**

```shell
# 启动测试
systemctl start smb
# 自启动
systemctl enable smb

```