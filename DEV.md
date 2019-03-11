# zhihui-front-web

## 开发

### 1.准备
在终端将目录切换到项目下，然后执行以下命令
```bash
# (install)
npm run install
# (build)
npm run build:dll
# (本地起服务run起来)
npm run dev
```

### 2.修改接口代理
找到webpackrc.js
```bash
proxy: {
  "/yanglao-web/oss": {
    "target": "https://zhihui.izaiqi.com/yanglao-web/oss",
    "pathRewrite": {"^/yanglao-web/oss/": "/"},
    "changeOrigin": true,
  },
  "/yanglao-web": {
    "target": "https://zhihui.izaiqi.com/yanglao-web",
    "pathRewrite": {"^/yanglao-web": "/"},
    "changeOrigin": true
  },
},
```
将proxy下的/yanglao-web服务下target对应的参数换成你要代理的地址，之后终端会重新run起来

### 3.修改路由地址
(在common/router.js下找到getRouterData方法里的routerConfig参数)
```bash
'/home': {
  component: dynamicWrapper(app, ['app'], () => import('../routes/home')),
},
```
key('/home')代表页面访问的路由地址，app表示绑定的models层并将整个模块的代码import进来
### 4.公钥的key修改
进入utils的config.js下找到PUBLIC_KEY这个参数，直接修改即可。