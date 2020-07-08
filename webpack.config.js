const path = require('path')

module.exports = {
  entry: {
    index: './lib/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.s([ac])ss$/,
        // 从右向左的顺序,webpack 中loader的原则 一个loader只做一件事情
        // sass-loader icon.scss -> icon.css
        // css-loader  icon.css -> 对象

        // style-loader 对象 -> <style>css</style>
        // document.createElement('style')
        // .innerHtml = 'css'
        // document.head.appendChild(style)

        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
