const path = require('path');

module.exports = {
  plugins: [
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
        style: true, // or 'css'
      },
    ],
  ],
  comments: false
};
