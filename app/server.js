const path = require("path");

const express = require("express");
const next = require("next");

const { setupPassport } = require('./commonLibrary/passport')

const { NODE_ENV, APP_HOST, APP_PORT } = process.env;

const dev = process.env.NODE_ENV !== "production";

const nextApplication = next({ dev });
const nextApplicationRequestHandler = nextApplication.getRequestHandler();

const app = express();

setupPassport(app);

app.use((req, res, next) => {
  console.log('req', req.url, req.headers, req.sessionID, req.user);
  next();
})

app.get("*", nextApplicationRequestHandler);

nextApplication
  .prepare()
  .then(() => {

    console.log(`> Starting server...`);

    app.listen(APP_PORT, APP_HOST, error => {
      if (error) {
        throw error;
      }

      console.log(`> Ready on http://${APP_HOST}:${APP_PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
