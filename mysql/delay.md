<div style="text-align: center;font-size: 40px;">mysql 延迟关联 优化 分页查询</div>

```sql
-- 找到 500 000 + 10 条记录id，然后回表查询 500 000 + 10 条记录 最后按分页条件返回10条记录
EXPLAIN
SELECT *
FROM `t_park_his_parking_record` LIMIT 500000, 10;

-- 找到 500 000 + 10 条记录的id，按分页取 10 个id，回表查询这 10 条记录，最后返回10条记录
EXPLAIN
SELECT *
FROM `t_park_his_parking_record`
         INNER JOIN (SELECT id FROM `t_park_his_parking_record` LIMIT 500000, 10) AS t USING (id);
-- 查看 sql 执行情况
show profiles;
```

