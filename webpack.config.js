require("dotenv").config();
const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
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
    new EnvironmentPlugin([
      "NODE_ENV",
      "BASE_URL",
      "PAYWALL_LOCK_ADDRESS",
      "MAGIC_PUBLISHABLE_KEY",
    ]),
  ],
  devServer: {
    static: path.join(__dirname, "example"),
    compress: true,
    port: 3000,
  },
};
