const express = require("express");
const next = require("next");
const { parse } = require("url");

const pathMatch = require("path-match")();

const authenticationHeaderExtraction = require("./lib/middleware/authenticationHeaderExtraction");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const logger = require("./lib/middleware/logger");
const { formatError } = require("./lib/errors");

const nextApp = next({
  dev: process.env.NODE_ENV !== "production"
});

const paths = [
  { path: '/cms/currencies/:currencyPair/chart', page: '/cms/currencies/chart.js' },
];

nextApp
  .prepare()
  .then(() => {
    expressServiceWith(app => {
      genericExpressService(app);
      logger(app);
      authenticationHeaderExtraction(app);

      const nextRequestHandler = nextApp.getRequestHandler();

      app.use((req, res) => {
        const { pathname, query } = parse(req.url, true);

        let x;
        let params;
        for (let i = 0, l = paths.length; i < l; i++) {
          x = paths[i];
          params = pathMatch(x.path)(pathname)

          if (params) {
            nextApp.render(req, res, x.page, Object.assign(params, query))
            return
          }
        }

        nextRequestHandler(req, res);
      });
    });
  })
  .catch(error => {
    console.log(`! ${formatError(error)}`);
  });
