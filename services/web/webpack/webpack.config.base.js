const path = require('path');

const packageJson = require('./package.json');
const vendorDependencies = Object.keys(packageJson['dependencies']);

const cacheLoader = {
  loader: 'cache-loader',
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
};

module.exports = {
  cache: true,
  entry: {
    main: './src/index.tsx',
    vendor: vendorDependencies,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [cacheLoader, babelLoader],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  plugins: [],
};
