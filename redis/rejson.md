<div style="text-align: center;font-size: 40px;">RedisJSON</div>

> [home](https://oss.redis.com/redisjson/) \
> [github](https://github.com/RedisJSON/RedisJSON) \
> [java client github](https://github.com/RedisJSON/JRedisJSON) \
> 支持 JSON 的 redis

## docker or podman
```shell
podman run -v/root/redis/conf:/usr/local/etc/redis -v /root/redis/data:/data -p 6379:6379 --name rejson redislabs/rejson:2.0.6
```

## [k8s yaml](../linux/lxc/k8s/rejson.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redisjson
  labels:
    app: redisjson
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redisjson
  template:
    metadata:
      labels:
        app: redisjson
    spec:
      imagePullSecrets:
        - name: fly-reg
      containers:
        - name: redisjson
          image: fly.reg.com/redisjson:2.0.6
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 6379
          volumeMounts:
            - name: redisjson
              mountPath: /etc/localtime
              readOnly: true
      volumes:
        - name: redisjson
          hostPath:
            path: /etc/localtime
---
apiVersion: v1
kind: Service
metadata:
  name: redisjson
spec:
  type: NodePort
  selector:
    app: redisjson
  ports:
    - name: http
      port: 6379
      targetPort: 6379
      nodePort: 30004
```