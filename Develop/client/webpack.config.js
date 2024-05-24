const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Plugin to generate a web app manifest
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin'); // Plugin to inject the Workbox service worker

module.exports = {
  mode: 'development', // Development mode
  entry: {
    main: './src/js/index.js', // Entry point for main bundle
    install: './src/js/install.js' // Entry point for install bundle
  },
  output: {
    filename: '[name].bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  plugins: [
    // HTMLWebpackPlugin to generate index.html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'], // Include only main bundle
    }),
    // HTMLWebpackPlugin to generate install.html
    new HtmlWebpackPlugin({
      template: './src/install.html',
      filename: 'install.html',
      chunks: ['install'], // Include only install bundle
    }),
    // WebpackPwaManifest to generate the web app manifest
    new WebpackPwaManifest({
      name: 'Your App Name', // Name of your app
      short_name: 'App', // Short name of your app
      description: 'Description of your app', // Description of your app
      background_color: '#ffffff', // Background color
      theme_color: '#ffffff', // Theme color
      crossorigin: 'use-credentials', // Cross-origin setting
      icons: [
        // Define your app icons here
      ]
    }),
    // InjectManifest to inject the service worker into the bundle
    new InjectManifest({
      swSrc: './src-sw.js', // Path to your service worker source file
      swDest: 'sw.js', // Output file for the service worker
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'] // Use style-loader and css-loader
      }
    ]
  }
};
