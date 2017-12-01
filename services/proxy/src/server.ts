import httpProxy from "http-proxy";

import authenticationHeaderInjection from "../common/middleware/authenticationHeaderInjection";
import expressServiceWith from "../common/middleware/expressServiceWith";
import logger from "../common/middleware/logger";
import passport from "../common/middleware/passport";
import sessions from "../common/middleware/sessions";
import { formatError } from "../common/errors";

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
  PROXY_PORT
} = process.env;

expressServiceWith(
  app => {
    logger(app);
    sessions(app);
    passport(app);
    authenticationHeaderInjection(app);

    const proxy = httpProxy.createProxyServer();

    app.all("/api/authentication/*", (req, res) => {
      proxy.web(req, res, {
        target: `http://${AUTHENTICATION_HOST}:${AUTHENTICATION_PORT}`
      });
    });

    app.all("/api/noflo/*", (req, res) => {
      proxy.web(req, res, {
        target: `http://${NOFLO_HOST}:${NOFLO_PORT}`
      });
    });

    app.all("/api/*", (req, res) => {
      proxy.web(req, res, {
        target: `http://${API_HOST}:${API_PORT}`
      });
    });

    app.all("/*", (req, res) => {
      proxy.web(req, res, {
        target: `http://${APPLICATION_HOST}:${APPLICATION_PORT}`
      });
    });

    proxy.on("error", error => {
      console.log(formatError(error));
    });
  },
  PROXY_HOST,
  PROXY_PORT
);
