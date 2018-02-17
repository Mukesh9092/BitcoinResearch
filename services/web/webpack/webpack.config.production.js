const webpack = require('webpack');
const webpackFailPlugin = require('webpack-fail-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = function() {
  const config = Object.extend({}, baseConfig);

  config.output.filename = '[name].[hash].js';

  config.plugins = config.plugins.concat(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  );

  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: true,
        },
      },
    }),
    webpackFailPlugin,
  );

  return config;
};
