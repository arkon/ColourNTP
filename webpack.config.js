const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, './src/scripts'),
  entry: {
    colours: './colours.js',
    options: './options.js'
  },
  output: {
    path: path.join(__dirname, './build/scripts'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['react'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.svg$/,
        loader: 'raw'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./src/scripts'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
};
