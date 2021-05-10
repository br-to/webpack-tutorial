const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  mode: "development",
  entry: "./src/javascripts/main.js",
  output: {
    filename: "./javascripts/main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    //ルートディレクトリの指定
    //サーバー起動時にブラウザを自動的に起動
    open: true,
    // ポート番号を変更
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\'.js'/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "> 0.2%, not dead" }]],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: true,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // // PostCSSのための設定
      // {
      //   loader: "postcss-loader",
      //   options: {
      //     // PostCSS側でもソースマップを有効にする
      //     // sourceMap: true,
      //     postcssOptions: {
      //       plugins: [
      //         // Autoprefixerを有効化
      //         // ベンダープレフィックスを自動付与する
      //         ["autoprefixer", { grid: true }],
      //       ],
      //     },
      //   },
      // },
      {
        test: /\.(jpeg|png|jpg)/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              }
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/test.pug",
      filename: "test.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
