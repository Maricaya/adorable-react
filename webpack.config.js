const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './lib/index.tsx'
  },
  resolve: {
    /*
    * extensions 有哪些后缀是需要支持的
    * */
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
  ],
  // 将 react 从我们的源代码中排出去
  externals: {
    react: {
      commonjs: 'react', // 依赖的时候如何依赖
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDom'
    }
  }
}
