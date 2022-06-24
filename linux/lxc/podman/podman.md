<div style="text-align: center;font-size: 40px;">Pod Manager tool</div>

## [podman 官方网站](https://podman.io)

## [github](https://github.com/TomSweeneyRedHat/podman)

## install

> `zypper in podman` Kubic 上测试可以正常使用 
>
> `pacman -S podman` archlinux

## [Rootless mode](https://man.archlinux.org/man/podman.1#Rootless_mode)

```shell
usermod --add-subuids 10000-65535 caddy
usermod --add-subgids 10000-65535 caddy
# or
echo caddy:10000:65536 >> /etc/subuid
echo caddy:10000:65536 >> /etc/subgid
```
## registry 加速

```properties
[[registry]]
   prefix = "docker.io"
   location = "rjm3pmfv.mirror.aliyuncs.com"
[[registry.mirror]]
   location = "rjm3pmfv.mirror.aliyuncs.com"
```

## [command](https://docs.podman.io/en/latest/Commands.html)

```shell
podman --help
podman <subcommand> --help
man podman
man podman-<subcommand>

podman search <search_term> # searching images
podman search httpd --filter=is-official # searching images
podman search httpd --f=is-official # searching images
podman pull docker.io/library/httpd #  pulling some images
podman images # list all images
podman run -dt -p 8080:80/tcp docker.io/library/httpd # Running a container
podman ps # Listing running containers
podman ps -a # Listing all containers
podman inspect -l | grep IPAddress # Inspecting a running container
podman logs -l # Viewing the container’s logs
podman top -l # Viewing the container’s pids
podman stop -l # Stopping the container
podman rm -l # Removing the container
```