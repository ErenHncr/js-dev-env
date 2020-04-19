import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MinifyPlugin from "babel-minify-webpack-plugin";
export default {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
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
      inject: true
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
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
