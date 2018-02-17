const webpack = require('webpack');

const baseConfig = require('./webpack.config.base.js');

module.exports = function() {
  const config = Object.extend({}, baseConfig);

  config.devtool = 'inline-source-map';

  config.plugins = config.plugins.concat(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  );

  return config;
};
