const path = require('path');
const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "onboarding.js",
    path: path.resolve(__dirname, "example/js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      template: "example/index.html",
      scriptLoading: "blocking",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "example"),
    compress: true,
    port: 3000,
  },
});
