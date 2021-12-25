<div style="text-align: center;font-size: 40px;">mysql5.7 sql_mode 默认开启 ONLY_FULL_GROUP_BY 问题</div>

> [参考博客](https://blog.csdn.net/weixin_43064185/article/details/99646535)

## my.cnf 末尾添加

```shell
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
event_scheduler=1
```

## command

```shell
# 查询 mysql 版本
SELECT VERSION();
# 查询 sql mode
SELECT @@sql_mode;
# 设置全局
SET @@global.sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
# 设置单库
use dbName;
SET sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
```