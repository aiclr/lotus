# rabbitmq

> [podman](podman.md#rabbitmq)
>
> docker
>
> Management Plugin rabbitmq default username and password of guest / guest
> > `docker run -d -p 5672:5672 -p 15672:15672 --name containerName imageID`\
> > `docker run -d -p 5672:5672 -p 15672:15672 --name containerName imageName:version`\
> > `docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3.11-management-alpine`\
>
> go to container exit container will not stop
> > `docker exec -it containerID /bin/bash`\
> > **alpine linux** `docker exec -it containerID /bin/sh`
>
> go to container exit container will stop
> > `docker attach containerID`
>
> exit container
> > `exit` 退出容器伪终端并关闭容器\
> > `ctrl+d` 退出容器伪终端并关闭容器\
> > `ctrl+c` 退出容器伪终端不关闭容器\
> > `ctrl+p+ctrl+q` 退出容器伪终端不关闭容器

[top](#rabbitmq)🚦[home](index.md#archlinux)

## rabbitmqadmin

> exchange
> > `rabbitmqadmin -u username -p password declare exchange name=exchange type=topic`
>
> queue
> > `rabbitmqadmin -u username -p password declare queue name=queue  durable=true`
>
> binding
> `rabbitmqadmin -u username -p password declare binding source=exchange destination=queue routing_key=key`

[top](#rabbitmq)🚦[home](index.md#archlinux)
