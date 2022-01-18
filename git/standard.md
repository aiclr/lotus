<div style="text-align: center;font-size: 40px;">git 使用 规范</div>

> [推荐阅读git-flow](https://www.cnblogs.com/wish123/p/9785101.html)

## 分支

- master
- hotfix
    - 生产环境版本紧急缺陷修复发布分支
    - 由 master 分支 fork
    - 可 merge 到 develop、master,完全 merge 后可删除分支
- release
    - 灰度发布分支、公测发布分支
    - 由 develop fork
    - 可 merge 到 master，完全merge后可移除当前分支
    - 除了修复 bug 提交外不可 commit 其他内容，
- develop
    - 开发主轴
    - 不建议直接 commit
    - 由 master 或 hotfix 分支 fork
    - 可 merge 到 release
    - 可从 release、hotfix、feature 分支merge
- feature
    - 新功能分支
    - 可 merge 到 develop,完全 merge 后可删除分支

## commit type

- feat 新功能
- fixBug 修复bug
- docs 文档相关
- style 代码格式化相关
- refactor 重构
- perf 性能优化
- test 测试相关
- build 构建系统或包依赖相关
- ci CI配置，脚本文件相关
- chore c库或测试文件相关
- revert commit 回退