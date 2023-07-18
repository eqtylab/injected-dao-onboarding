require("dotenv").config();
const { EnvironmentPlugin } = require("webpack");

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
  plugins: [
    new EnvironmentPlugin([
      "BASE_URL",
      "PAYWALL_LOCK_ADDRESS",
      "MAGIC_PUBLISHABLE_KEY",
    ]),
  ]
};
