const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');
const cssTemplate = require('./src/svg/template/template.js');
const {version} = require('./package.json');

// const es3ifyWebpackPlugin = require('es3ify-webpack-plugin');

module.exports = (webpackConfig) => {
  const production = process.env.NODE_ENV === 'production';
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js';

  const themePath = path.join(__dirname, './src/themes/vars.less');

  const themeVariables = lessToJs(fs.readFileSync(themePath, 'utf8'));

  const cssModulesExclude = [
    './src/assets/iconfont/css/iconfont-jxrs.scss',
    './src/assets/iconfont/css/iconfont.scss',
  ];

  // if (!webpackConfig.module) {
  //   webpackConfig.module = {
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         loader: 'css-loader',
  //       },
  //     ],
  //   };
  // }

  // if (webpackConfig.module) {
  //   webpackConfig.module.rules.push({
  //     test: /\.(js|jsx)$/,
  //     loader: 'babel',
  //     include: path.join(__dirname, '/node_modules/ansi-styles'),
  //     exclude: /node_modules\/(?!ansi-styles)/,
  //     options: {
  //       presets: ['env', 'react']
  //     }
  //   });
  // }

  // if (webpackConfig.module) {
  //   webpackConfig.module.rules.push({
  //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //     loader: 'url-loader',
  //     options: {
  //       limit: 1024,
  //       name: '[name].[hash:8].[ext]',
  //     },
  //   });
  // }

  if (webpackConfig.module) {
    webpackConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [`${__dirname}/node_modules/ali-oss`, `${__dirname}/node_modules/react-helmet`, `${__dirname}/node_modules/json3`, `${__dirname}/node_modules/js-idcard`],
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    });

    webpackConfig.module.rules.map((loader) => {
      if (String(loader.test) === '/\\.less$/') {
        loader.use.filter(item => /.*less-loader.*/.test(item.loader))[0].options.modifyVars = themeVariables;
      }
      return loader;
    });

    webpackConfig.module.rules = webpackConfig.module.rules.filter((loader) => {
      return String(loader.test) !== '/\\.css$/' && String(loader.test) !== '/\\.(sass|scss)$/';
    });

    webpackConfig.module.rules = webpackConfig.module.rules.concat([{
      test: /\.css$/,
      exclude: /iconfont\.scss/,
      loader: 'style-loader!css-loader?modules',
    }, {
      test: /\.(sass|scss)$/,
      include: /iconfont\.scss/,
      loader: 'style-loader!css-loader!sass-loader',
    }]);
  }

  if (production) {
    if (webpackConfig.module) {
      // ClassnameHash
      webpackConfig.module.rules.map((loader) => {
        if (String(loader.test) === '/\\.less$/' || String(loader.test) === '/\\.css/') {
          loader.use.filter(item => /.*css-loader.*/.test(item.loader))[0].options.localIdentName = '[hash:base64:5]';
        }
        return loader;
      });
    }
    webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }));
  }

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new IconfontPlugin({
      src: `${__dirname}/src/svg/icon`, // required - directory where your .svg files are located
      family: 'iconfont-jxrs', // optional - the `font-family` name. if multiple iconfonts are generated, the dir names will be used.
      dest: {
        font: './src/assets/iconfont/font/[family].[type]', // required - paths of generated font files
        css: './src/assets/iconfont/css/[family].scss', // required - paths of generated css files
      },
      watch: {
        pattern: `${__dirname}/src/svg/icon/*.svg`, // required - watch these files to reload
        cwd: undefined, // optional - current working dir for watching
      },
      cssTemplate,
    }),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/src/public/unsupportedBrowser`,
        to: production ? '../' : webpackConfig.output.outputPath,
      },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      favicon: `${__dirname}/src/public/favicon.ico`,
      template: `${__dirname}/src/entry.ejs`,
      filename: production ? '../index.html' : 'index.html',
      minify: production ? {
        collapseWhitespace: true,
      } : null,
      hash: true,
      // headScripts: production ? null : ['/roadhog.dll.js'],
    }),
    // new es3ifyWebpackPlugin()
  ]);

  // Alias
  // webpackConfig.resolve.alias = {
  //   components: `${__dirname}/src/components`,
  //   utils: `${__dirname}/src/utils`,
  //   config: `${__dirname}/src/utils/config`,
  //   enums: `${__dirname}/src/utils/enums`,
  //   services: `${__dirname}/src/services`,
  //   models: `${__dirname}/src/models`,
  //   routes: `${__dirname}/src/routes`,
  //   themes: `${__dirname}/src/themes`,
  //   public: `${__dirname}/src/public`,
  // };

  return webpackConfig;
};
