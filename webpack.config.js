
var path = require("path");
// var webpack = require("webpack");

module.exports = {
    entry: "./src/game.js",
    output: {path: path.resolve(__dirname, "dist"),
             filename: "bundle.js",
             publicPath: "/dist"},

    resolve: {modules: ["node_modules"],
              extensions: [".js"]}
};