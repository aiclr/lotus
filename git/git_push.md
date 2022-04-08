<div style="text-align: center;font-size: 40px;">git push</div>

## [reference](https://git-scm.com/docs/git-push)

---

## push

```shell
# 当前分支与远程分支已关联
git push
# 推送 HEAD 当前分支 到远程已关联的分支
git push origin HEAD
# 推送 local_develop 分支到已关联的分支
git push origin local_develop
# 推送 HEAD 当前分支到远程 remote 分支
git push origin HEAD:remote
# 推送 local_develop 分支到远程 remote_develop 分支
git push origin local_develop:remote_develop
```

## force push

```shell
# gitlab 默认将 master 分支设置为 protect 不允许强制 push
# git push -f 强制提交 风险极高 本地commit会强制覆盖远程commit
git push -f origin develop
```