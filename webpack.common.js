const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const InsertHtmlPlugin = (chunks) => {
  return chunks.map(chunk => new HtmlPlugin({
      title : `Image Tracker | ${chunk.charAt(0).toUpperCase() + chunk.slice(1)}`,
      filename : `${chunk}.html`,
      chunks : [chunk]
  }))
}

module.exports = {
  entry: {
    popup : path.resolve('./src/presentation/extension/popup.tsx'),
    background : path.resolve('./src/presentation/extension/background.ts'),
    content : path.resolve('./src/presentation/extension/content.ts')
  },
  module : {
    rules : [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['solid'],
              },
            },
            {
              loader: 'ts-loader',
            }   
        ]
      },
      {
        test : /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type : 'assets/resource',
        use : 'asset/resource'
      },
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, '../src/main/component/styles/global'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns : [
        { 
          from : path.resolve('./src/main/assets'), 
          to : path.resolve('dist') 
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename : `style.module.css`
    }),
    ...InsertHtmlPlugin([
        'popup'
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  output : {
    filename : '[name].js',
    path : path.resolve(__dirname, './dist')
  },
  optimization: {
    splitChunks : {
      chunks : 'all'
    }
  },
};