import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  devtool: 'inline-source-map',
  entry: [path.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [],
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
