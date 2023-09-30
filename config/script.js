const dotenv = require('dotenv');
const webpack = require('webpack');
const getIsProd = require('./get-is-prod');

const customInterpolateName = (url) => url.toLowerCase();

const LoaderOptionsPluginOptions = {
  debug: false,
  minimize: true,
  options: {customInterpolateName},
};

const IgnorePluginOptions = {contextRegExp: /moment$/u, resourceRegExp: /^\.\/locale$/u};

const getPlugins = ({mode}) => (getIsProd(mode) ? [new webpack.LoaderOptionsPlugin(LoaderOptionsPluginOptions)] : []);

console.log(dotenv.config().parsed);

module.exports = (config) => ({
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        test: /\.(js|jsx|ts|tsx)$/u,
        use: [{loader: 'babel-loader', options: {cacheDirectory: true}}],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...dotenv.config().parsed,
        NODE_ENV: config.mode,
      }),
    }),
    new webpack.IgnorePlugin(IgnorePluginOptions),
    ...getPlugins(config),
  ],
});