const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'./': path.resolve('./src/'),
      'src': path.resolve('./src'),
      'api': path.resolve('./src/api'),
      'models': path.resolve('./src/models'),
    },
  },
  module: {
    rules: [
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false,
				},
			},
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
		watchFiles: './dist',
  },
};
