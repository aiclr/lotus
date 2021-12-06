<div style="text-align: center;font-size: 40px;">gpg</div>

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

## 添加ssh私钥

```shell
# 阅读提示自定义设置
ssh-keygen -t rsa -C "caddyRen@qq.com" 
cat ~/.ssh/id_rsa.pub 
```