
const webpack = require('webpack')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  lintOnSave: false, //关闭Eslint的格式规范检测
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])
  }
}
