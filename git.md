# git

| [home](index.md)  | [reference](https://git-scm.com/docs/) | [frequently](#frequently) |
| :---------------- | :------------------------------------- | :------------------------ |
| [clone](#clone)   | [查看其他分支文件](#show)              | [ssh](#ssh)               |
| [branch](#branch) | [初始化仓库](#init)                    | [gpg](#gpg)               |
| [commit](#commit) | [gitlab新建仓库](#gitlab)              |
| [merge](#merge)   |
| [rebase](#rebase) | [reflog](#reflog)                      |
| [push](#push)     |
| [tag](#tag)       |

# frequently

| [top](#git)                                              | [home](index.md)                   |
| :------------------------------------------------------- | :--------------------------------- |
| 提交记录                                                 | `git log --pretty=oneline`         |
| 仓库状态                                                 | `git status`                       |
| 追加修改到仓库                                           | `git add .`                        |
| 提交commit                                               | `git commit -m "feat: init"`       |
| fetch 更新 origin 仓库 的指定分支                        | `git fetch origin main:main`       |
| push 提交 本地 develop 分支 到 origin 仓库 develop2 分支 | `git push origin develop:develop2` |

[top](#git) | [home](index.md)

# tag

> **tag name 与 branch name 不能相同**\
> [参考文档](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
> `git tag` 列出标签
> `git tag -l "0.0.*"` 查找标签0.0.开头的标签，需要-l或者--list
> `git tag 0.0.1` 创建轻量标签 不需要-a,-s,-m选项，只需要提供标签名字
> `git tag -a 0.0.2 -m "0.0.2版本"` 创建附注标签 可以被校验，包含打标签者的`name`，`email`，日期地址，标签信息，并且可以使用GNU Privacy Guard（GPG）签名验证
> `git tag -a 0.0.3 e37da745df4102b68b81d0ec681ba28e910d2344` 对某一提交码打标签
> `git show 0.0.1` 查看信息
> `git push origin 0.0.1` 推送单个tag到远程仓库
> `git push origin --tags` 推送全部标签到远程仓库
> `git tag -d 0.0.1` 删除标签
> `git push origin --delete 0.0.1` 删除远程仓库上的标签

[top](#git) | [home](index.md)

# push

> `gitlab` 默认将 `master` 分支设置为 `protect` 不允许强制 `push -f`

> [参考文档](https://git-scm.com/docs/git-push)
> > `git push` 当前分支与远程分支已关联\
> > `git push origin HEAD` 推送 HEAD 当前分支 到远程已关联的分支\
> > `git push origin local_develop` 推送 local_develop 分支到已关联的分支\
> > `git push origin HEAD:remote` 推送 HEAD 当前分支到远程 remote 分支\
> > `git push origin local_develop:remote_develop` 推送 local_develop 分支到远程 remote_develop 分支\
> > `git push -f origin develop` 强制提交 风险极高 本地commit会强制覆盖远程commit

[top](#git) | [home](index.md)

# gpg

> 新增 gpg
> > `gpg --full-generate-key` 根据提示输入`用户名`，`邮箱`，`密钥长度4096`,`过期时间`，`是否信任`，`github` 要注意邮箱要是 github 验证过的邮箱\
> > `gpg --list-keys` 列出本地存储的所有gpg密钥信息\
> > `gpg --armor --export xxxx(pub key)` 打印公钥字符串，复制添加到git仓库 \
> > `git config --global user.signingkey {key_id}` 全局使用此gpg \
> > `git commit -S -m "xxx"` `-S` 表示这次提交需要使用GPG密钥签名 \
> > `git config --local commit.gpgsign true` 当前仓库每次commit 时自动要求签名

> gpg 过期处理
> > `gpg --list-keys` 列出本地存储的所有gpg密钥信息 \
> > `gpg --edit-key xxxxxxx` 进入编辑模式 
> > > `gpg>expire`  更新过期日期\
> > > `gpg>trust`   添加信任模式\
> > > `gpg>save`   保存
> >
> > `gpg --armor --export xxxx(pub key)` 打印公钥字符串，删除旧的，复制添加到git仓库即可

[top](#git) | [home](index.md)

# ssh

> 添加 ssh 私钥 **github 需要设置密码**[参考](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

> win10 powershell
> > `ssh-keygen -t rsa -b 2048  -C "xxx@xx.com"`
> > `clip` 复制到粘贴板 
> > `cat ~/.ssh/caddyRen_rsa.pub | clip`
>
> linux
> > `ssh-keygen -t rsa -b 2048  -C "caddyRen@qq.com"`
> > `cat ~/.ssh/caddyRen_rsa.pub`

> 多 ssh 配置 `vim ~/.ssh/config`
> ```text
> Host git.parkere.cn
> HostName git.parkere.cn
>   PreferredAuthentications publickey
>   IdentityFile ~/.ssh/work_rsa
> Host bougainvilleas
>   HostName github.com
>   PreferredAuthentications publickey
>   IdentityFile ~/.ssh/bougainvilleas_rsa
> Host caddyRen
>   HostName github.com
>   PreferredAuthentications publickey
>   IdentityFile ~/.ssh/caddyRen_rsa
> ```

> `Host` 替换掉真实域名 `git clone git@bougainvilleas:bougainvilleas/lotus.git` \
> `HostName` 真实域名 `git clone git@github.com:bougainvilleas/lotus.git`

> 检测
> ```shell
> ssh git@git.parkere.cn
> ssh git@caddyRen
> ssh git@bougainvilleas
> ```

[top](#git) | [home](index.md)

# reflog

> [参考文档](https://git-scm.com/docs/git-reflog)\
> 查看本地git操作日志 `git reflog`\
> 回滚到02a3260 `git reset --hard 02a3260`\
> 远程提交回退 `git push origin HEAD --force`

[top](#git) | [home](index.md)

# rebase

> [参考文档](https://git-scm.com/docs/git-rebase)
> 
> 将b1的基线变更为b2
> > 当前在b1分支 `git rebase b2`\
> > 当前不在b1分支 `git rebase b2 b1`
> 
> ***仅推荐在本地分支push前合并未提交到远程的 commit，不熟悉rebase机制 易造成 git 提交顺序日期混乱***\
> ***有冲突，解决冲突（建议使用idea解决冲突）,将解决冲突后的文件 add 加入仓库，rebase 每个 commit 都可能会有冲突，依次解决所有 commit 的冲突***
> > 冲突
> > > ```shell
> > > git add .
> > > git rebase --continue #(继续)
> > > git rebase --skip #(跳过)
> > > git rebase --abort #(取消 rebase)
> > > ```
> >
> > 合并多个未提交远程 commit\
> > 注意: \
> > ***仅限本地分支进行***\
> > ***切勿对已提交的commit合并***\
> > ***可使用 [reflog](#reflog) 进行回退***
> > > 1. 在当前分支的起始点（如提交码为12345678），rebase时以此节点为基础 rebase `git rebase -i 12345678`
> > > 2. 自动进入 vim 编辑模式，可以看到 12345678 到当前的所有 commit 信息
> > > 3. 第一行pick commit，其余行squash，wq保存
> > > 4. 编辑 git message 作为合并后的 commit message，wq保存
> > > 5. 有冲突手动解决后执行`git add .`和`git --continue`,直到所有冲突解决完成，则选择的commit会合并为一个commit

[top](#git) | [home](index.md)

# merge

> [参考文档](https://git-scm.com/docs/git-merge)\
> ***merge 之前 两个分支都要先 commit***

1. 当前分支 develop 将 temp 分支合并到develop `git merge temp`
2. 产生冲突（IDEA工具更方便处理冲突）
3. 手动处理冲突代码执行`git add 冲突文件` 然后 `git commit -m "feat: merge temp into develop"`

[top](#git) | [home](index.md)

# init

## local

```shell
# 初始化不指定分支名称 默认创建 master 分支
git init -b <branch-name> --initial-branch=<branch-name>

git init -b develop
git config --local user.email "xxx@xx.com"
git config --local user.name "caddy"
git status
git add README.md
git commit -m "feat: init"
git log --pretty=oneline

# 添加远程分支
# 可以添加多个远程仓库 比如一份代码需要提交到两个仓库
git remote add origin https://xxx/temp.git
git remote
git fetch origin

# gitlab 默认将 master 分支设置为 protect 不允许强制 push
# git push -f 强制提交 风险极高 本地commit会强制覆盖远程commit
git push -f origin develop
```

[init](#init) | [top](#git) | [home](index.md)

### gitlab

#### Create a new repository

```shell
git clone URL
cd testcaddy
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

#### Push an existing folder

```shell
cd existing_folder
git init
git remote add origin URL
git add .
git commit -m "Initial commit"
git push -u origin master
```

#### Push an existing Git repository

```shell
cd existing_repo
git remote rename origin old-origin
git remote add origin URL
git push -u origin --all
git push -u origin --tags
```

[init](#init) | [top](#git) | [home](index.md)

# commit

> 修改 `commit message`
> > 未提交 远程 `git commit --amend`
> > 已提交 远程
> > > ```shell
> > > git reset --soft HEAD~1
> > > git commit -m "new message"
> > > git push -f origin branchname
> > > ```

[top](#git) | [home](index.md)

# show

> 查看其他分支文件 `git show develop:README.md`

[top](#git) | [home](index.md)

# clone

> `git clone xxx`

[top](#git) | [home](index.md)

# branch

> 查
> > 查看本地分支 `git branch`\
> > 查看远程分支 `git branch -r`\
> > 查看全部分支 `git branch -a`\
> > 查看分支详情 `git branch -v -a`

> 增
> > 创建不切换
> > > 以当前分支为基线创建temp分支 `git branch temp`\
> > > 以base为基线创建temp分支,***base可以为tag或提交码*** `git branch temp base`
> >
> > 切换 `git checkout temp`
> > 
> > 创建并切换
> > > 以当前分支为基线创建temp分支,并切换到temp分支 `git checkout -b temp`\
> > > 以base为基线创建temp分支并切换到temp,***base可以为tag或提交码*** `git checkout -b temp base`\
> > > 以远程仓库origin内的develop分支为基线创建develop分支，并切换到develop分支 `git checkout -b develop origin/develop`

> 删
> >
 
> 改
> >

[top](#git) | [home](index.md)