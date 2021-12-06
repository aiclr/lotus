<div style="text-align: center;font-size: 40px;">firewald 防火墙策略</div>

- 开放端口 `firewall-cmd --zone=public --add-port=66/tcp --permanent`
- 关闭端口 `firewall-cmd --zone=public --remove-port=66/tcp --permanent`
- 开放服务 `firewall-cmd --zone=public --add-service=ftp --permanent`
- 关闭服务 `firewall-cmd --zone=publci --remove-service=ftp --permanent`
- 重载防火墙使防火墙策略更改生效 `firewall-cmd --reload`
- 查看开放端口 `firewall-cmd --list-ports`
- 查看开放服务 `firewall-cmd --list-service`