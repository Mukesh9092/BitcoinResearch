import * as httpProxy from 'http-proxy';
import unhandledError from 'unhandled-error';

import authenticationHeaderInjectionMiddleware from './common/middleware/authenticationHeaderInjection';
import expressServiceWith from './common/middleware/expressServiceWith';
import loggerMiddleware from './common/middleware/logger';
import passportMiddleware from './common/middleware/passport';
import sessionsMiddleware from './common/middleware/sessions';
import { formatError } from './common/errors';

const {
  API_GRAPHQL_HOST,
  API_GRAPHQL_PORT,
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  // NOFLO_HOST,
  // NOFLO_PORT,
  PROXY_HOST,
  PROXY_PORT,
  WEB_HOST,
  WEB_PORT,
} = process.env;

expressServiceWith(
  async app => {
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

    app.all('/api/graphql/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}`,
      });
    });

    app.all('/*', (req, res) => {
      proxy.web(req, res, {
        target: `http://${WEB_HOST}:${WEB_PORT}`,
      });
    });

    proxy.on('error', error => {
      console.log(formatError(error));
    });

    return app;
  },
  String(PROXY_HOST),
  Number(PROXY_PORT),
);

unhandledError(console.log);
