const base = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = Object.assign({}, base,{
  mode: 'production',
  output: {
    // 放置在 doc 目录下
    path: path.resolve(__dirname, 'doc')
  },
  entry: {
    ...base.entry,
    example: './example.tsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Xue - React",
      template: "example.html",
      filename: 'example.html'
    })
  ]
})
