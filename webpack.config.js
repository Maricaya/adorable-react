const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './lib/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    library: 'FUI',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        }
    ]
  },
  plugins: [
    /*
    * html-webpack-plugin 的作用是：创建一个 html 文件，把 webpack 打包后的静态文件自动插入到 html 当中。
    * */
    new HtmlWebpackPlugin({
      title: "Xue - React",
      template: "index.html"
    })
  ]
}
