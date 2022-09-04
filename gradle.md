<div style="text-align: center;font-size: 40px;">gradle</div>

# gradle

[升级 gradle 版本](#upgrade) | [jvm 参数配置](#gradleproperties) | [home](index.md#gradle)|

> [官方文档](https://docs.gradle.org/current/userguide/userguide.html) \
> [支持java版本对照](https://docs.gradle.org/current/userguide/compatibility.html) \
> [使用指引](https://docs.gradle.org/current/userguide/getting_started.html) \
> [例子](https://docs.gradle.org/current/samples/index.html) \
> [故障](https://docs.gradle.org/current/userguide/troubleshooting.html) \
> [多模块](https://docs.gradle.org/current/userguide/intro_multi_project_builds.html) \
> [gradle.properties](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_configuration_properties)

## command

### upgrade

```shell
#  扫描并查看弃用视图 view the deprecations view of the generated build scan
gradle help --scan
# 或者查看全部警告，来确认是否有弃用内容
gradle help --warning-mode=all
# 手动清除不再支持的 plugins
# to update the project to 7.4.2.
gradle wrapper --gradle-version 7.4.2
# try to run the project
```

## gradle.properties

```properties
org.gradle.caching=true
org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true

```

[top](#gradle) | [home](index.md#gradle)