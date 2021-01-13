const HtmlWebPackPlugin = require("html-webpack-plugin");
// var glob = require("glob");
// var path = require("path");

module.exports = {
  entry: "./src/client/index.js",

  // entry: glob.sync("./src/client/*/**.js").reduce(function (obj, el) {
  //   obj[path.parse(el).name] = el;
  //   return obj;
  // }, {}),
  // output: {
  //   path: path.resolve(__dirname, "../static/js"),
  //   filename: "[name]",
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html", // transform this
      filename: "./index.html", // generate this in the dist folder
    }),
  ],
};
