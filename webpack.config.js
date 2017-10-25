const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/ts/main.ts'),
    path.join(__dirname, 'src/scss/main.scss')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/dist",
    filename: 'assets/js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true,
                      outputStyle: 'expanded',
                  }
              }
          ],
      })
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new ExtractTextPlugin('/assets/css/bundle.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    })
  ]
};