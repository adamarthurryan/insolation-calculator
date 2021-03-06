module.exports = {
  cache: true,
  entry: './src/client',
  output: {
    filename: './dist/browser-bundle.js'
  },
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          compact: "false"
        }
      },
    ]
  },
};
