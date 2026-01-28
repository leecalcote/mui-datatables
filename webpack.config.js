const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', './examples/Router/index.js'],
  },
  stats: 'verbose',
  context: __dirname,
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    hot: true,
    inline: true,
    port: 5050,
    stats: 'errors-warnings',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        include: /node_modules\/(@mui|@emotion)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
              ],
              sourceType: 'unambiguous',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
