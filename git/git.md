<div style="text-align: center;font-size: 40px;">git</div>

## [reference](https://git-scm.com/docs/)

---

## 查看其他分支文件

```shell
git show develop:README.md
```
---

## 修改 commit message

```shell
# 未提交 远程
git commit --amend

# 已提交 远程
git reset --soft HEAD~1
git commit -m "new message"
git push -f origin branchname
```

---

## 本地仓库

### 初始化

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
```

### 添加远程分支

```shell
# 可以添加多个远程仓库 比如一份代码需要提交到两个仓库
git remote add origin https://xxx/temp.git
git remote
git fetch origin

# gitlab 默认将 master 分支设置为 protect 不允许强制 push
# git push -f 强制提交 风险极高 本地commit会强制覆盖远程commit
git push -f origin develop
```

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

---

## 从远程仓库获取

```shell
git clone https://xxx/caddy/temp
git branch   #(查看本地分支)
git branch -r #(查看远程分支)
git branch -a #(查看全部分支)
git checkout -b develop origin/develop
git branch temp #(以当前分支为基线创建temp分支)
git branch temp base #(以base为基线创建temp分支,base可以为tag)
git checkout -b temp #(以当前分支为基线创建temp分支,并切换到temp分支)
git checkout -b temp base #(以base为基线创建temp分支并切换到temp,base可以为tag)
git checkout temp #(切换到temp分支)
```

---

## [git merge](https://git-scm.com/docs/git-merge)

***merge 之前 两个分支都要先 commit***

1. 当前分支 develop 将 temp 分支合并到develop `git merge temp`
2. 产生冲突（IDEA工具更方便处理冲突）
3. 手动处理冲突代码执行`git add 冲突文件` 然后 `git commit -m "feat: merge temp into develop"`

---

## [git rebase](https://git-scm.com/docs/git-rebase)

#### 基操

```shell
git rebase b2 #(当前在b1分支)
git rebase b2 b1 #(b1基线变更为b2)
```

***仅推荐在本地分支push前合并未提交到远程的 commit，不熟悉rebase机制 易造成 git 提交顺序日期混乱***

#### 冲突

```shell
git add .
git rebase --continue #(继续)
git rebase --skip #(跳过)
git rebase --abort #(取消 rebase)
```

***有冲突，解决冲突（建议使用idea解决冲突）,将解决冲突后的文件加入仓库，rebase 每个 commit 都可能会有冲突，依次解决所有 commit 的冲突***

### 合并多个未提交 commit

1. 在当前分支的起始点（如提交码为12345678），rebase时以此节点为基础 rebase `git rebase -i 12345678`
2. 自动进入 vim 编辑模式，可以看到 12345678 到当前的所有 commit 信息
3. 第一行pick commit，其余行squash，wq保存
4. 编辑 git message 作为合并后的 commit message，wq保存
5. 有冲突手动解决后执行`git add .`和`git --continue`,直到所有冲突解决完成，则选择的commit会合并为一个commit

***

- ***仅限本地分支进行***
- ***切勿对已提交的commit合并***
- ***可使用 reflog 进行回退***


## [HOME](../index.md)