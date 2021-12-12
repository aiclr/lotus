<div style="text-align: center;font-size: 40px;">server-jre8u311 for alpine3.15</div>

## [server-jre not jre](https://www.oracle.com/java/technologies/downloads/)

## [jce](https://www.oracle.com/cn/java/technologies/javase-jce8-downloads.html)

```shell
curl -L -C - -b "oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip -o jce_policy-8.zip
```

> 浏览器 [download](https://www.oracle.com/cn/java/technologies/javase-jce8-downloads.html) 需要登陆

## [glibc](https://github.com/sgerrand/alpine-pkg-glibc/releases)

```shell
curl -SL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-2.34-r0.apk -o glibc-2.34-r0.apk
curl -SL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-bin-2.34-r0.apk -o glibc-bin-2.34-r0.apk
curl -SL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.34-r0/glibc-i18n-2.34-r0.apk -o glibc-i18n-2.34-r0.apk
```

## [Dockerfile](Dockerfile)

## [build]()

```shell
#!/bin/bash
image_name="server-jre"
version="8u311-alpine"

echo -e "\n==> begin delete all containers of " $image_name
docker rm $(docker stop $(docker ps -a | grep $image_name | awk '{print $1}'))

echo -e "\n==> begin delete all images of " $image_name
docker rmi -f $(docker images | grep $image_name | awk '{print $3}')

echo -e "\n==> begin build your images of " $image_name
docker build -f Dockerfile -t $image_name:$version .

echo -e "\n==> begin to package your image to tar file"
docker save $image_name:$version > ./$image_name-$version.tar
```

## [HOME](../../../index.md)