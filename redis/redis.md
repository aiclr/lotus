<div style="text-align: center;font-size: 40px;">Redis</div>

> [home](https://redis.io) \
> [documentation](https://redis.io/documentation) \
> [commands](https://redis.io/commands) \
> [github](https://github.com/redis/redis)

## docker or podman
```shell
podman run -v/root/redis/conf:/usr/local/etc/redis -v /root/redis/data:/data -p 6379:6379 --name redis redis:6.2.6
```

## [k8s yaml](../linux/lxc/k8s/redis.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  labels:
    app: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      imagePullSecrets:
        - name: fly-reg
      containers:
        - name: redis
          image: fly.reg.com/redis:6.2.6
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 6379
          volumeMounts:
            - name: redis
              mountPath: /etc/localtime
              readOnly: true
      volumes:
        - name: redis
          hostPath:
            path: /etc/localtime
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  type: NodePort
  selector:
    app: redis
  ports:
    - name: http
      port: 6379
      targetPort: 6379
      nodePort: 30003
```