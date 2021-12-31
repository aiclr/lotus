
```shell
podman run -v/root/redis/conf:/usr/local/etc/redis -v /root/redis/data:/data -p 6379:6379 --name rejson redislabs/rejson:2.0.6
```