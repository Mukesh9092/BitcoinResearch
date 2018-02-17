import * as httpProxy from 'http-proxy';
import { Application } from 'express';
import unhandledError from 'unhandled-error';

import authenticationHeaderInjectionMiddleware from './common/middleware/authenticationHeaderInjection';
import expressServiceWith from './common/middleware/expressServiceWith';
import loggerMiddleware from './common/middleware/logger';
import passportMiddleware from './common/middleware/passport';
import sessionsMiddleware from './common/middleware/sessions';
import { formatError } from './common/errors';

const {
  API_HOST,
  API_PORT,
  APPLICATION_HOST,
  APPLICATION_PORT,
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  NOFLO_HOST,
  NOFLO_PORT,
  PROXY_HOST,
  PROXY_PORT,
} = process.env;

expressServiceWith(
  (app: Application) => {
    loggerMiddleware(app);
    sessionsMiddleware(app);
    passportMiddleware(app);
    authenticationHeaderInjectionMiddleware(app);

    const proxy = httpProxy.createProxyServer();

    app.all('/api/authentication/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${AUTHENTICATION_HOST}:${AUTHENTICATION_PORT}`,
      });
    });

    app.all('/api/noflo/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${NOFLO_HOST}:${NOFLO_PORT}`,
      });
    });

    app.all('/api/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${API_HOST}:${API_PORT}`,
      });
    });

    app.all('/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${APPLICATION_HOST}:${APPLICATION_PORT}`,
      });
    });

    proxy.on('error', error => {
      console.log(formatError(error));
    });
  },
  String(PROXY_HOST),
  Number(PROXY_PORT),
);

unhandledError(console.log);
