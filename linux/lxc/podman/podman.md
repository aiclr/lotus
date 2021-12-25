<div style="text-align: center;font-size: 40px;">Pod Manager tool</div>

> [podman 官方网站](https://podman.io) \
> [github](https://github.com/TomSweeneyRedHat/podman)

## install

> `zypper in podman` \
> `pacman -S podman`

## [command](https://docs.podman.io/en/latest/Commands.html)

```shell
podman --help
podman <subcommand> --help
man podman
man podman-<subcommand>

podman search <search_term> # searching images
podman search httpd --filter=is-official # searching images
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