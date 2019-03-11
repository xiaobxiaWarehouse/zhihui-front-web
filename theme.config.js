const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

module.exports = () => {
  // const themePath = path.join(__dirname, './src/themes/default.less')
  // 使用var.less，因default中引入var，lessToJs并不能将var中的参数提出，因此直接使用var.less
  const themePath = path.join(__dirname, './src/themes/vars.less')
  return lessToJs(fs.readFileSync(themePath, 'utf8'));
}
