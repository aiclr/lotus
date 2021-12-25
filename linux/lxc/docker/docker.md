<div style="text-align: center;font-size: 40px;">docker</div>

## 开启远程

```shell
vi /lib/systemd/system/docker.service
# 修改配置
[Service]
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
# 重启docker
systemctl daemon-reload
systemctl restart docker

# 开放远程端口
firewall-cmd --zone=public --add-port=2375/tcp --permanent
```