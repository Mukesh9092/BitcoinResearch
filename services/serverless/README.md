# Local Kubernetes

## Install Minikube

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
minikube start
```

## Install Kubeless

```
export RELEASE=v0.4.0
curl -O https://github.com/kubeless/kubeless/releases/download/v0.4.0/kubeless_linux-amd64.zip
unzip kubeless_linux-amd64.zip
mv bundles/kubless_linux-amd64/kubeless /usr/local/bin/
rm -rf bundles kubeless_linux-amd64.zip
kubectl create -f https://github.com/kubeless/kubeless/releases/download/$RELEASE/kubeless-$RELEASE.yaml
```

## Open Browser

```
minikube dashboard
```
