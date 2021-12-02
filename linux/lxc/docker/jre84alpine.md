<div style="text-align: center;font-size: 40px;">jre8 for alpine</div>

## [jre](https://java.com/zh-CN/download/manual.jsp)

## [jce](http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip)

```shell
curl -L -C - -b "oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip -o jce_policy-8.zip
```

## [glibc](https://github.com/sgerrand/alpine-pkg-glibc)

```shell
curl -sSL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-2.34-r0.apk -o glibc-2.34-r0.apk
curl -sSL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-bin-2.34-r0.apk -o glibc-bin-2.34-r0.apk
curl -sSL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-i18n-2.34-r0.apk -o glibc-i18n-2.34-r0.apk
```

## [HOME](../../../index.md)