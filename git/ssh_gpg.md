<div style="text-align: center;font-size: 40px;">ssh & gpg</div>

## 新增gpg

```shell
# 根据提示输入用户名，邮箱，密钥长度4096,过期时间，是否信任，github要注意邮箱要是github验证过的邮箱
gpg --full-generate-key 
# 列出本地存储的所有gpg密钥信息
gpg --list-keys
# 打印公钥字符串，复制添加到git仓库
gpg --armor --export xxxx(pub key) 
# 全局使用此gpg
git config --global user.signingkey {key_id} 
# -S 表示这次提交需要使用GPG密钥签名
git commit -S -m "xxx" 
# 当前仓库每次commit 时自动要求签名
git config --local commit.gpgsign true 
```

## gpg过期处理

```shell
# 列出本地存储的所有gpg密钥信息
gpg --list-keys 
# 进入编辑模式
gpg --edit-key xxxxxxx 
gpg>expire   # 更新过期日期
gpg>trust   # 添加信任模式
gpg>save   # 保存
# 打印公钥字符串，删除旧的，复制添加到git仓库即可
gpg --armor --export xxxx(pub key) 
```

## 添加ssh私钥 **github 需要设置密码**[参考](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### win10 powershell

```shell
ssh-keygen -t rsa -b 2048  -C "caddyRen@qq.com"
# clip 复制到粘贴板 
cat ~/.ssh/caddyRen_rsa.pub | clip
```

### linux

```shell
ssh-keygen -t rsa -b 2048  -C "caddyRen@qq.com"
cat ~/.ssh/caddyRen_rsa.pub
```

### 多 ssh 配置

```shell
vim ~/.ssh/config

Host git.parkere.cn
  HostName git.parkere.cn
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/work_rsa
Host bougainvilleas
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/bougainvilleas_rsa
Host caddyRen
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/caddyRen_rsa
```

> Host 替换掉真实域名 `git clone git@bougainvilleas:bougainvilleas/lotus.git`
>
> HostName 真实域名 `git clone git@github.com:bougainvilleas/lotus.git`

### 检测

```shell
ssh git@git.parkere.cn
ssh git@caddyRen
ssh git@bougainvilleas
```