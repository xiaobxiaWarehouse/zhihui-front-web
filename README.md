# zhihui-front-web

## 部署

### 1.打包
```bash
npm run build
```

### 2.准备
创建压缩上传的脚本(以ubuntu为例)
```bash
# (ubuntu)
./up.sh
# 把dist文件夹压缩为zhihui-front-web.tar.gz
tar zcf zhihui-front-web.tar.gz -C ./dist .
# 以root身份把包上传至服务器
scp zhihui-front-web.tar.gz root@118.31.103.99:/opt/www/
```

### 3.执行上传脚本
```bash
# (ubuntu)
./up.sh
```

### 4.去服务器部署
进入服务器的/opt/www文件夹下  
执行ci-script目录下的deploy.sh脚本，就部署好了。

### 4.回滚
如果新部署的版本出现严重错误无法测试，可以回滚到上一版本。
