import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config = (env: Object, argv: {mode: string}): Configuration => {

  const isProduction = argv.mode === 'production';
  console.log(`mode = ${argv.mode}`);

  // webpack-dev-serverの設定
  const devServerConfig: webpackDevServer.Configuration = {
    host: 'localhost',
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  };

  const config: Configuration = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: devServerConfig,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000
    },

    entry: path.resolve('./src/js/index.tsx'),
    output: {
      path: path.resolve(`./build/`),
      filename: 'main.js',
    },
    module: {
      rules: [
        // TypeScript
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        // CSS
        {
          test: /\.css/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
          ],
        },
        // 画像ファイル
        {
          test: /\.png/,
          use: ['url-loader'],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // ecma: 6,
            // warnings: false,
            parse: {},
            compress: {},
            mangle: true,
            module: false,
            // output: null,
            toplevel: false,
            // nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: true,          
          }
        })
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: './public',
            to: '',
          },
        ]
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  }

  const workbox = new WorkboxWebpackPlugin.GenerateSW({
    maximumFileSizeToCacheInBytes: 500 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: new RegExp('https://aipri.jp/.*'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'aipri',
          expiration: {
            maxEntries: 60000,
            maxAgeSeconds: 5 * 30 * 24 * 60 * 60,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  });

  if(isProduction) {
    config.plugins?.push(workbox);
  }
 
  return config;
};


export default (env: any, argv: any) => config(env, argv);
