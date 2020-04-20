import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MinifyPlugin from "babel-minify-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export default {
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  // Create separate bundle of vendor libraries so that they are cached seperately.
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      trackJSToken: '77e77bfcb8ea4ce89b5d637c451ca805'
    }),

    // Minify JS
    new MinifyPlugin()
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        //loaders: ['babel']
      },
      // {
      //   test: /.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
