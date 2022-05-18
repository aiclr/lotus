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

## EXPLAIN

> `SELECT * FROM xxx WHERE id = 1;`

| id   | select_type | table | partitions | type  | possible_keys | key     | key_len | ref   | rows | filtered | Extra |
| :--- | :---------- | :---- | :--------- | :---- | :------------ | :------ | :------ | :---- | :--- | :------- | :---- |
| 1    | SIMPLE      | xxx   | null       | const | PRIMARY       | PRIMARY | 8       | const | 1    | 100      | null  |

> `select_type`: 表示对应行是简单查询还是复杂查询
> > `SIMPLE`:    不包含子查询和`union`的简单查询\
> > `PRIMARY`:   复杂查询中最外层的`select`\
> > `SUBQUERY`:  包含在`select`中的子查询 不在`from`的子句中\
> > `DERIVED`:   包含在 `from` 子句中的子查询 `mysql` 会将查询结果放入一个临时表中 此临时表也叫衍生表\
> > `UNION`:     在`union`中的第二个和随后的`select`,`UNION RESULT`为合并的结果
> 
> `table`: 表示当前行访问的表
> > `<derivedN>`: 子查询 表示当前查询依赖`id=N`行的查询,所以先执行`id=N`行的查询
> 
> `partitions`: 查询将匹配记录的分区,对于非分区表该值为`NULL`
> 
> `type`: 表示关联类型或访问类型,`MySql`决定如何查找表中的行.\
> 依次从最优到最差分别为`system > const > eq_ref > ref > range > index > all`
> > `NULL`: `MySql` 能在优化阶段分解查询语句,在执行阶段不用再去访问表或索引\
> > `system`和`const`: `MySql`对查询的某部分进行优化,并把其转化为一个常量.可以通过`show warnings` 命令查看结果.`system`是`const`的一个特例表示表里只有一条元组匹配时为`system`\
> > `eq_ref`: 主键或唯一键索引被连接使用,最多只会返回一条符合条件的记录.简单的`select`查询不会出现这种`type`\
> > `ref`: 相比 `eq_ref` 不使用唯一索引,而是使用普通索引或唯一索引的部分前缀,索引和某个值比较,会找到多个符合条件的行\
> > `range`: 通常出现在范围查询中,`in` `between` `大于` `小于`等. 使用索引来检索给定范围的行\
> > `index`: 扫描全索引拿到结果,一般是扫描某个`二级索引`,二级索引一般比较少,所以通常比`ALL`快一点
> > `ALL`: 全表扫描 扫描聚簇索引的所有叶子节点
> 
> `possible_keys`: 此列显示在查询中可能用到的索引\
> 如果该列为`NULL` 则表示没有相关索引\
> 可以通过检查`where`子句是否可添加一个适当的索引来提高性能
> 
> `key`: 此列显示`MySql`在查询时实际使用到的索引\
> 在执行计划中可能出现`possible_keys`列有值,\
> 而`key`列为`null`,这种情况可能是表中数据不多,\
> `MySql`认为索引对当前查询帮助不大而选择了全表查询.\
> 如果想强制`MySql`使用或忽视`possible_keys`列中的索引,在查询时使用`force index`  `ignore index`
> 
> `key_len`: 此列显示`MySql`在索引里使用的字节数,\
> 通过此列可以算出具体使用了索引中的哪些列,索引最大长度为`768字节`,\
> 当长度过大时,`MySql`会做一个类似最左前缀处理,将前半部分字符提取出做索引.\
> 当字段可以为`null`时,需要一个字节去记录
> > 计算规则:
> > > 字符产:
> > > > `char(n)`: n个数字或者字母占n个字节,汉字占3n个字节\
> > > > `varchar(n)`: n个数字或者字母占n个字节,汉字占3n+2个字节.+2字节用来存储字符串长度
> > >
> > > 数字类型:
> > > > `tinyint`: 1字节\
> > > > `smallint`: 2字节\
> > > > `int`: 4字节\
> > > > `bigint`: 8字节
> > >
> > > 时间类型:
> > > > `date`: 3字节\
> > > > `timestamp`: 4字节\
> > > > `datetime`: 8字节
> 
> `ref` 此列显示`key`列记录的索引中,表查找值时使用到的列或常量.常见的有`const` 字段名
> 
> `rows` 此列是`MySql`在查询中估计要读取的行数,注意这里不是结果集的行数
> 
> `filtered` 
> 
> `Extra` 额外信息
> > `Using index` 使用覆盖索引(如果`select`后面查询的字段都可以从这个索引的树中获取,不需要通过辅助索引树找到主键,再通过主键去主键索引树里获取其它字段值)\
> > `Using where` 使用`where`语句来处理结果,并且查询的列未被索引覆盖\
> > `Using index condition` 查询的列不完全被索引覆盖,`where`条件中是一个查询的范围\
> > `Using temporary MySql`需要创建一张临时表来处理查询,出现这种情况一般都是要进行优化的\
> > `Using filesort` 将使用外部排序而不是索引排序,数据较小时从内存排序,否则需要在磁盘完成排序\
> > `Select tables optimized away` 使用某些聚合函数 `max` `min`等来访问存在索引的某个字段