const webpack = require('webpack');
const getIsProd = require('./get-is-prod');
const { config } = require('dotenv');
const path = require('path');

const ROOT_PATH = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const dotenvNameList = [`.env.${NODE_ENV}.local`, '.env.local', `.env.${NODE_ENV}`, '.env'];
const dotenvPathList = dotenvNameList.map((name) => path.resolve(ROOT_PATH, name));
const { parsed } = config({ path: dotenvPathList });

const customInterpolateName = (url) => {
  return url.toLowerCase();
};

const getPlugins = (options) => {
  const result = [
    new webpack.DefinePlugin({
      'process.env': Object.entries(parsed).reduce(
        (acc, [key, value]) => {
          acc[key] = JSON.stringify(value);

          return acc;
        },
        { NODE_ENV: JSON.stringify(NODE_ENV) },
      ),
    }),
  ];

  if (getIsProd(options.mode)) {
    result.push(
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
        options: { customInterpolateName },
      }),
    );
  }

  return result;
};

module.exports = (options) => {
  return {
    module: {
      rules: [
        {
          exclude: /node_modules/u,
          test: /\.(js|jsx|ts|tsx)$/u,
          use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        },
      ],
    },
    plugins: getPlugins(options),
  };
};
