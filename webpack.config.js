var path = require('path');
var webpack = require('webpack');

module.exports = {
  // cache: true,
  entry: ['./main'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      d3: 'd3',
      $: './d3-selector'
    })
  ]
};
