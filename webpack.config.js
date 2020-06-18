/**
 * Node core modules
 */
const path = require('path')
/**
 * Npm modules
 */
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    main: ['@babel/polyfill', './app.js', './main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // filename: '[name].bundle.js' // name = entry.main output main.bundle.js
    filename: 'bundle.js' // name = entry.main output main.bundle.js
  },
  devServer: {
    // open: true, // Tells dev-server to open the browser after server had been started
    // overlay: true, // Shows a full-screen overlay with errors or warnings
    // hot: false // update changes without full refresh in the browser
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css'
              // outputPath: 'css'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              // eslint options (if necessary)
            }
          }
        ]
      }
    ]
  }
}
