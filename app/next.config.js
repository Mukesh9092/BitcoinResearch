const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const util = require('util')

module.exports = {
  webpack: (config, { dev }) => {
    /*
    config.plugins.push(new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [],
      },
    }));

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]',
          },
        },
        'raw-loader',
        'val-loader',
        {
          loader: 'skeleton-loader',
          options: {
            procedure: content => (
              `${content} \n${['module.exports = {',
                'stylesheet: module.exports.toString(),',
                'classNames: exports.locals',
                '}',
              ].join('')}`
            ),
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: true,
            importLoaders: 1,
            localIdentName: '[local]-[hash:base64:5]',
          },
        },
        'postcss-loader',
      ],
    });
    */

    // Fix for "Error: Can't resolve 'react/lib/ReactTransitionGroup'".
    if (config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']

      console.log(util.inspect(config, { depth: null }))
    }

    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',

      // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
      // generateStatsFile: true,

      // Will be available at `.next/stats.json`
      // statsFilename: 'stats.json'
    }));

    // In production, use Preact.
    if (!dev) {
      config.resolve.alias = {
        react: 'preact-compat/dist/preact-compat',
        'react-dom': 'preact-compat/dist/preact-compat',
      };
    }

    return config;
  },
};
