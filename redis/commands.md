<div style="text-align: center;font-size: 40px;">redis commands</div>

## 注意

> [Redis Cluster only supports database zero](https://redis.io/commands/select) \
> redis 6.0 以后的新功能 ACL A container for Access List Control commands 访问控制列表 \
> 

## [commands](https://redis.io/commands)

```shell
# 测试 connect
redis-cli -h localhost -p 6379 ping
# 密码 测试 connect
redis-cli -h localhost -p 6379 -a password ping

# connect
redis-cli -h localhost -p 6379
# 密码
redis-cli -h localhost -p 6379 -a password
# 连接后 认证
localhost:6379> AUTH [username] password
# redis 6.0 以后的新功能 A container for Access List Control commands 访问控制列表 默认用户 default ,设置不同用户并授予命令或数据权限
localhost:6379> ACL USERS

# 切换数据库 index[0,15] 供16个库，默认连接0
localhost:6379> select 1
# Return the number of keys in the currently-selected database
localhost:6379> dbsize
localhost:6379> JSON.SET doc $ '{"a":2,"b":3,"nested":{"a":4,"b":null}}'
OK
localhost:6379> get keys
(nil)
localhost:6379> dbsize
(integer) 1
localhost:6379> GET *
(nil)
localhost:6379> JSON.GET doc
"{\"a\":2,\"b\":3,\"nested\":{\"a\":4,\"b\":null}}"
localhost:6379> JSON.GET doc $..b
"[3,null]"
localhost:6379> JSON.GET doc ..a $..b
"{\"..a\":[2,4],\"$..b\":[3,null]}"
localhost:6379> JSON.GET doc ..a
"2"
localhost:6379> JSON.GET doc $..a
"[2,4]"
localhost:6379> JSON.GET doc $..a $..b
"{\"$..a\":[2,4],\"$..b\":[3,null]}"


```
