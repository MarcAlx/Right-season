// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

//define output dev folders
const outputDev = "dist/dev";
const outputProd = "dist/prod";

module.exports = function(env){
  let outputFolder=outputDev;
  let dev = !(env && env.prod);
  if(!dev){
    outputFolder=outputProd;
  }

  const config = {
    // Tell webpack to start bundling our app at src/index.js
    entry: './src',
    // Output our app to the output folder
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, outputFolder)
    },
    //Emit source map only for dev mode
    devtool: dev?'source-map':false,
    module: {
      rules: [
        //for json
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        //Tell webpack to run our source code through Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        //lint code before building
        { 
          test: /\.(js|jsx)$/,        
          loader: 'eslint-loader',
          enforce: 'pre',        
          exclude: /node_modules/,
          options:{
            failOnWarning: true,          
            failOnError: true          
          }
        },
        //compile less files into css
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary
              use: ['css-loader', 'less-loader']
            })
          }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          loader: 'less-loader',
          options: {
            //source map only in dev
            sourceMap: dev
          }
      }
    ]
    },
  
    // Since Webpack only understands JavaScript, we need to
    // add a plugin to tell it how to handle html files.   
    plugins: [
      new CleanWebpackPlugin([outputDev,outputProd],{verbose:  true,}),
      // Configure HtmlPlugin to use our own index.html file
      // as a template.
      // Check out https://github.com/jantimon/html-webpack-plugin
      // for the full list of options.
      new HtmlPlugin({
        template: 'src/index.html'
      }),
      new ExtractTextPlugin('style.css'),
      //Copy assets from source
      new CopyWebpackPlugin([
        { 
          from: 'src/assets', 
          to: 'assets' 
        },
      ])
    ]
  }

  if(!dev){
    //define some env variables for production
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }));

    //uglify for production
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,      
      compress: {
          warnings: false,
          drop_console: true
      },
      output: {
          comments: false
      }
    }));
  }

  return config;
}