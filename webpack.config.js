module.exports = {
  cache: true,
  entry: './src/client',
  output: {
    filename: './dist/browser-bundle.js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          compact: "false"
        }
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    fs: 'empty',
  }
};
