require("dotenv").config();
const { EnvironmentPlugin, ProvidePlugin } = require("webpack");

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
    fallback: {
      buffer: require.resolve("buffer/"),
    },
  },
  plugins: [
    new EnvironmentPlugin({
      "BASE_URL": process.env.VERCEL_URL, // this is to fix deployemnts
      PAYWALL_LOCK_ADDRESS: "",
      MAGIC_PUBLISHABLE_KEY: ""
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
