const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// define the vender files (for code splitting)
const VENDOR_LIBS = [
  'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk'
];

module.exports = {
  // code splitting: my code and vendor code
  entry: {
    // my code
    bundle: './src/index.js',
    // vendor code
    vendor: VENDOR_LIBS
  },
  output: {
    // abs dir where I want to dump the bundle
    path: path.join(__dirname, 'public'),
    // outputs bundle.js and vendor.js (maps straight from entry entries)
    // filename: '[name].js'
    // add cache busting hash to the output file
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        // for transpiling
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        // for css loading
        // loaders are loaded from right to left
        // css-loader reads in the css
        // style-loader spits it out into the bundle
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      },
      {
        // font-awesome
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    // remove duplicate code from bundle.js and vendor.js
    new  webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor'
      // cache busting functionality (manifest file is for aiding the process)
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      // even if there are old bundle files existing in the folder,
      // it will only add the new ones
      template: 'src/index.html'
    })
  ]
};
