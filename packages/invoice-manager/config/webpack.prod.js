const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/invoice-manager/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'invoice-manager',
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        customer: `customer@${domain}/customer/latest/remoteEntry.js`,
        product: `product@${domain}/product/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
