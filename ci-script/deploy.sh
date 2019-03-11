#!/bin/sh:/root/nodejs/node-v8.2.0-linux-x64/bin
pwd
echo '*****npm install 模块安装*****'
/root/nodejs/node-v8.2.0-linux-x64/bin/npm install
echo '*****第'$BUILD_NUMBER'编译开始*****'
if buildNum=$BUILD_NUMBER node ./node_modules/roadhog/bin/roadhog.js build
then
	echo '*****编译完成******'
	tar zcf zhihui-front-web.tar.gz -C ./dist .
	echo '*****打包压缩完成*****'
else
	echo "******编译失败*****"
	exit 1
fi
