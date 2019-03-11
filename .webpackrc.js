// require('babel-polyfill');
const path = require('path');
const { version } = require('./package.json');

// const svgSpriteDirs = [
//   require.resolve('antd').replace(/warn\.js$/, ''), // antd 内置svg
//   path.resolve(__dirname, 'src/svg/icon'),  // 业务代码本地私有 svg 存放目录
// ];

export default {
  entry: './src/index.js',
  // svgSpriteLoaderDirs: svgSpriteDirs,
  // cssModulesExclude: [
  //   './src/assets/iconfont/css/iconfont-jxrs.scss',
  //   './src/assets/iconfont/css/iconfont.scss',
  // ],
  // theme: "./theme.config.js",
  // publicPath: '/',
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}/`,
  disableDynamicImport: true,
  // sass: {},
  // disableDynamicImport: true,
  hash: true,
  // devtool: 'cheap-module-eval-source-map',
  // 接口代理示例
  proxy: {
    '/yanglao-web/oss': {
      // target: 'https://ylzh.izaiqi.com/yanglao-web/oss',
      // pathRewrite: { '^/yanglao-web/oss': '/' },
      target: 'http://192.168.50.197:8088/yanglao-web',
      pathRewrite: { '^/yanglao-web/oss/((?:.(?!\\?+))*.?)(?:\\?+)?(.*)$': '/rest/api/v1/ossauth?key=$1&$2' }, // ossauth验证
      changeOrigin: true,
      logLevel: 'debug',
    },
    '/yanglao-web': {
      target: 'https://ylzh.izaiqi.com/yanglao-web',
      // target: 'https://dev.smartcare.biz/yanglao-web',
      // target: 'http://192.168.0.101:8080/yanglao-web',
      // target: 'http://192.168.50.73:8088/yanglao-web',
      // target: 'http://192.168.50.197:8088/yanglao-web',
      // target: 'http://192.168.50.139:8088/yanglao-web',
      pathRewrite: { '^/yanglao-web': '/' },
      changeOrigin: true,
      // logLevel: 'debug',
    },
  },
  extraBabelPlugins: [
    // [
    //   'module-resolver',
    //   {
    //     alias: {
    //       components: path.join(__dirname, './src/components'),
    //       utils: path.join(__dirname, './src/utils'),
    //       config: path.join(__dirname, './src/utils/config'),
    //       enums: path.join(__dirname, './src/utils/enums'),
    //       services: path.join(__dirname, './src/services'),
    //       models: path.join(__dirname, './src/models'),
    //       routes: path.join(__dirname, './src/routes'),
    //       themes: path.join(__dirname, './src/themes'),
    //       public: path.join(__dirname, './src/public'),
    //     },
    //   },
    // ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  env: {
    development: {
      publicPath: '/',
      extraBabelPlugins: ['dva-hmr'],
      define: {
        buildNum: process.env['buildNum'],
      },
    },
    production: {
      define: {
        buildNum: process.env['buildNum'],
      },
    },
  },
  alias: {
    components: path.resolve(__dirname, './src/components'),
    utils: path.resolve(__dirname, './src/utils'),
    config: path.resolve(__dirname, './src/utils/config'),
    enums: path.resolve(__dirname, './src/utils/enums'),
    services: path.resolve(__dirname, './src/services'),
    models: path.resolve(__dirname, './src/models'),
    routes: path.resolve(__dirname, './src/routes'),
    themes: path.resolve(__dirname, './src/themes'),
    public: path.resolve(__dirname, './src/public'),
  },
  // dllPlugin: {
  //   exclude: ["babel-runtime", "roadhog"],
  //   include: ["dva/router", "dva/saga", "dva/fetch"]
  // }
};
