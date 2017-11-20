const express = require("express");
const httpProxy = require("http-proxy");

const authenticationHeaderInjection = require("./lib/middleware/authenticationHeaderInjection");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const logger = require("./lib/middleware/logger");
const passport = require("./lib/middleware/passport");
const sessions = require("./lib/middleware/sessions");
const { formatError } = require("./lib/errors");

const {
  APPLICATION_HOST,
  APPLICATION_PORT,
  API_HOST,
  API_PORT,
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT
} = process.env;

expressServiceWith(app => {
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

  app.all("/api/*", (req, res) => {
    proxy.web(req, res, { target: `http://${API_HOST}:${API_PORT}` });
  });

  app.all("/*", (req, res) => {
    proxy.web(req, res, {
      target: `http://${APPLICATION_HOST}:${APPLICATION_PORT}`
    });
  });

  proxy.on("error", error => {
    console.log(formatError(error));
  });
});
