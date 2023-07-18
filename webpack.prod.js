const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  externals: {
    'magic-sdk': 'Magic',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
});
