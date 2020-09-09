const path = require('path');

module.exports = {
  entry: "./lib/main.js",
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "bundle.js",
  },
};