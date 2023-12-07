const webpack = require('webpack');
const getIsProd = require('./get-is-prod');
require('dotenv').config();

const envKeyList = [
  'FIREBASE_API_KEY',
  'FIREBASE_APP_ID',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_MESSAGING_SENDERID',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
];

const customInterpolateName = (url) => url.toLowerCase();

const LoaderOptionsPluginOptions = {
  debug: false,
  minimize: true,
  options: {customInterpolateName},
};

const IgnorePluginOptions = {contextRegExp: /moment$/u, resourceRegExp: /^\.\/locale$/u};

const getPlugins = ({mode}) => (getIsProd(mode) ? [new webpack.LoaderOptionsPlugin(LoaderOptionsPluginOptions)] : []);

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
      'process.env': {
        ...Object.fromEntries(envKeyList.map((key) => [key, JSON.stringify(process.env[key])])),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.IgnorePlugin(IgnorePluginOptions),
    ...getPlugins(config),
  ],
});
