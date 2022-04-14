<div style="text-align: center;font-size: 40px;">git tag</div>

> 注意:
>
> **tag name 与 branch name 不能相同**

---

## [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

```shell
git tag #(列出标签)
git tag -l "0.0.*" #(查找标签0.0.开头的标签，需要-l或者--list)
git tag 0.0.1 #(创建轻量标签 不需要-a,-s,-m选项，只需要提供标签名字)
git tag -a 0.0.2 -m "0.0.2版本" #(创建附注标签 可以被校验，包含打标签者的名字，email，日期地址，标签信息，并且可以使用GNU Privacy Guard（GPG）签名验证)
git tag -a 0.0.3 e37da745df4102b68b81d0ec681ba28e910d2344 #(对某一提交码打标签)
git show 0.0.1 #(查看信息)
git push origin 0.0.1 #（推送单个tag到远程仓库）
git push origin --tags #(推送全部标签到远程仓库)
git tag -d 0.0.1 #（删除标签）
git push origin --delete 0.0.1 #（删除远程仓库上的标签）
```