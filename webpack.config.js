var pkg = require('./package.json');
var webpack = require('webpack');
var path = require('path')

module.exports = {
  devtool: false,
  entry: {
    vconsole : './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-class-properties')]
          }
        }
      },
      {
        test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'vconsole-outputlog-plugin.min.js'
  },
  plugins:[
    new webpack.BannerPlugin([
        pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
        'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
        pkg.license + ' license'
      ].join('\n')
    )
  ]
};