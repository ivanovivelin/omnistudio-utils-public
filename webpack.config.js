const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.js', 
    cli: './bin/cli.js', 
  },
  output: {
    filename: '[name].js', 
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  target: 'node', 
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,  
          },
        },
        extractComments: false,  
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,  
      entryOnly: true,  
    }),
  ],
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
