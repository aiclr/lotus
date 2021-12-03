<div style="text-align: center;font-size: 40px;">kubic</div>

## [kubeadm](https://en.opensuse.org/Kubic:kubeadm)

1. 安装选择 kubeadm Node
2. 设置时区 Asia/Shanghai
3. 设置 hostname & ip & dns & gateway`virtualbox nat 10.0.0.1`

### ssh

```shell
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
# 重启 ssh
systemctl restart sshd.service
service sshd restart
```

### master

```shell
kubeadm init --image-repository registry.aliyuncs.com/google_containers
# 根据提示 复制配置文件
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
# Setup weave
kubectl apply -f /usr/share/k8s-yaml/weave/weave.yaml
#You may need to reboot the master after applying this change if you see runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:Network plugin returns error: Missing CNI default network when runnnig kubectl describe nodes.
# 输出join信息
kubeadm token create --print-join-command
```

### slave

```shell
mkdir .kube
scp root@10.0.0.6:/etc/kubernetes/admin.conf $HOME/.kube/config
# 在 master 输出join信息
kubeadm token create --print-join-command
kubeadm join 10.0.0.6:6443 --token 7eagfo.s93tp0nxirady7w7 \
	--discovery-token-ca-cert-hash sha256:82b4363e47a2e37d0a40298c37d6f9129fdae982cc403b94585bfabdd4351afb
# 设置nodes roles
master:~ # kubectl label no slave kubernetes.io/role=slave
node/slave labeled
```

### check

```shell
master:~ # kubectl get nodes
NAME     STATUS     ROLES                  AGE   VERSION
master   NotReady   control-plane,master   2m    v1.22.2
master:~ # kubectl get pod -n kube-system
NAME                             READY   STATUS     RESTARTS   AGE
coredns-7f6cbbb7b8-bwd6h         0/1     Pending    0          2m29s
coredns-7f6cbbb7b8-tx95n         0/1     Pending    0          2m29s
etcd-master                      1/1     Running    0          2m36s
kube-apiserver-master            1/1     Running    0          2m37s
kube-controller-manager-master   1/1     Running    0          2m28s
kube-proxy-7wsmt                 1/1     Running    0          2m29s
kube-scheduler-master            1/1     Running    0          2m34s
weave-net-5ksh4                  0/2     Init:0/1   0          48s
master:~ # kubectl get pods -n kube-system -l name=weave-net -o wide
NAME              READY   STATUS    RESTARTS      AGE   IP         NODE     NOMINATED NODE   READINESS GATES
weave-net-5ksh4   2/2     Running   1 (14m ago)   78m   10.0.0.6   master   <none>           <none>
master:~ # reboot

master:~ # kubectl get pod -n kube-system
NAME                             READY   STATUS    RESTARTS      AGE
coredns-7f6cbbb7b8-bwd6h         1/1     Running   0             80m
coredns-7f6cbbb7b8-tx95n         1/1     Running   0             80m
etcd-master                      1/1     Running   1             80m
kube-apiserver-master            1/1     Running   1             80m
kube-controller-manager-master   1/1     Running   1             80m
kube-proxy-7wsmt                 1/1     Running   1             80m
kube-scheduler-master            1/1     Running   1             80m
weave-net-5ksh4                  2/2     Running   1 (15m ago)   78m
```

### k8s一些指令

```shell
kubeadm reset
kubectl get nodes
kubectl get namespaces
kubectl get pods -n kube-system
kubectl get pod -n kube-system
kubectl get pod --all-namespaces
kubectl get pods
kubectl get pods -n kube-system -l name=weave-net -o yaml | grep IP
kubectl drain slave --delete-local-data --ignore-daemonsets
kubectl delete node slave
kubectl cluster-info

kubectl describe deployment nginx-deployment
kubectl describe pod nginx-deployment-66b6c48dd5-p9kbk
```

### [Dashboard UI](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

> https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/
> https://github.com/kubernetes/dashboard/blob/master/docs/user/accessing-dashboard/README.md

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml


slave:~ # kubectl get namespaces
NAME                   STATUS   AGE
default                Active   3h36m
kube-node-lease        Active   3h36m
kube-public            Active   3h36m
kube-system            Active   3h36m
kubernetes-dashboard   Active   36m
slave:~ # kubectl get pods -n kubernetes-dashboard
NAME                                        READY   STATUS    RESTARTS   AGE
dashboard-metrics-scraper-c45b7869d-vrc6t   1/1     Running   0          43m
kubernetes-dashboard-576cb95f94-87lz5       1/1     Running   0          43m
slave:~ # kubectl get svc -n kubernetes-dashboard
NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
dashboard-metrics-scraper   ClusterIP   10.100.244.14    <none>        8000/TCP   43m
kubernetes-dashboard        ClusterIP   10.107.123.253   <none>        443/TCP    43m
```

#### localhost 访问

```shell
kubectl proxy

http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

#### 外部访问

```shell
kubectl proxy --address='0.0.0.0' --accept-hosts='^*$'

http://192.168.1.100:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

## kubic 原子更新

```shell
transactional-update shell
zypper ref #刷新
zypper dup #更新
exit
transactional-update cleanup #清理未使用的系统快照
```

### zypper

```shell
Repository Management:
  repos, lr             List all defined repositories.
  addrepo, ar           Add a new repository.
  removerepo, rr        Remove specified repository.
  renamerepo, nr        Rename specified repository.
  modifyrepo, mr        Modify specified repository.
  refresh, ref          Refresh all repositories.
  clean, cc             Clean local caches.
# 例子
zypper addrepo -f https://mirrors.bfsu.edu.cn/opensuse/tumbleweed/repo/non-oss bfsu-non-oss
zypper addrepo -f https://mirrors.bfsu.edu.cn/opensuse/tumbleweed/repo/non-oss bfsu-non-oss
zypper ar -f https://mirrors.bfsu.edu.cn/opensuse/tumbleweed/repo/non-oss bfsu-non-oss
zypper ar -f https://mirrors.bfsu.edu.cn/opensuse/tumbleweed/repo/non-oss bfsu-non-oss
 
zypper repos -d # 查看详细信息
zypper mr -da # 禁用全部
zypper refresh # 刷新
zypper in docker # 安装docker
```

## [HOME](../../../index.md)