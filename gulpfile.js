var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  webpackConfig = require('./webpack.config.js'),
  open = require("gulp-open");

gulp.task('webpack-dev-server', function (callback) {
  var config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;

  new WebpackDevServer(webpack(config), {
    publicPath: '/' + config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function (err) {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);

      gulp.src('./index.html')
        .pipe(open('', {url: 'http://localhost:8080/webpack-dev-server/index.html'}));
    });
});

gulp.task('build', function (callback) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError('build', err);
    gutil.log('[build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('default', ['webpack-dev-server']);