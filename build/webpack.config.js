const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts', // 入口文件
  output: { // 输出文件
    filename: 'main.js' // 输出文件的文件名
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'], // 自动解析文件名后缀
  },
  module: { // 对指定文件的处理，如loader等
    rules: [{
      test: /\.tsx?$/, // 匹配文件名后缀为ts或tsx的文件
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  /**
   * NODE_ENV如何引入?
   * package.json中使用webpack-dev-server插件
   * 利用cross.js 定义环境NODE_ENV
   * webpack-dev-server启动，通过config参数，来指定配置文件
   */
  devtool: process.env.NODE_ENV === 'production' ? 'false' : 'inline-source-map',
  devServer: {
    contentBase: './dist', // 运行时基于哪个根目录运行的
    stats: 'errors-only', // 终端只会提示错误信息
    compress: false, // 不启用压缩
    host: 'localhost',
    port: 8989
  },
  plugins: [
    new CleanWebpackPlugin({ // 指定编译模板
      cleanOnceBeforeBuildPatterns: ['./dist'], // 在打包之前清理dist文件
    }), // 清理指定文件夹|文件
    new HtmlWebpackPlugin({
      template: './src/template/index.html'// 编译的时候利用./src/template/index.html文件作为模板
    }),
  ]
}