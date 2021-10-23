const path = require("path");

module.exports = {
  entry: path.resolve(__dirname,"../index.js"),
  output: {
    path: path.resolve(__dirname, "../../assets/js/"),
    filename: "react.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
