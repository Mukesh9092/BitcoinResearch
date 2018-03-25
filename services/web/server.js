import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import unhandledError from 'unhandled-error';

import authenticationHeaderExtractionMiddleware from './common/middleware/authenticationHeaderExtraction';
import expressServiceWithMiddleware from './common/middleware/expressServiceWith';
import genericExpressService from './common/middleware/genericExpressService';
import loggerMiddleware from './common/middleware/logger';

import webpackConfig from './webpack.config.js';

const { WEB_HOST, WEB_PORT } = process.env;

const DEV = process.env.NODE_ENV === 'development';

expressServiceWithMiddleware(
  async (app) => {
    genericExpressService(app);
    loggerMiddleware(app);
    authenticationHeaderExtractionMiddleware(app);

    if (DEV) {
      const compiler = webpack(webpackConfig);

      app.use(webpackDevMiddleware(compiler, {
        logLevel: 'debug',
        serverSideRender: true,
        publicPath: webpackConfig[0].output.publicPath,
      }));

      app.use(webpackHotMiddleware(compiler.compilers[0]));

      app.use(webpackHotServerMiddleware(compiler, {
        chunkName: 'server',
      }));

      const compilerDonePromise = new Promise((resolve, reject) => {
        compiler.hooks.done.tap('ApplicationStart', resolve);
      });

      await compilerDonePromise;

      return app;
    }

    const CLIENT_ASSETS_DIR = join(__dirname, '../build/client');
    const CLIENT_STATS_PATH = join(CLIENT_ASSETS_DIR, 'stats.json');
    const SERVER_RENDERER_PATH = join(__dirname, '../build/server.js');
    const serverRenderer = require(SERVER_RENDERER_PATH);
    const stats = require(CLIENT_STATS_PATH);
    app.use(express.static(CLIENT_ASSETS_DIR));
    app.use(serverRenderer(stats));

    return app;
  },
  String(WEB_HOST),
  Number(WEB_PORT),
);

unhandledError(console.log);
