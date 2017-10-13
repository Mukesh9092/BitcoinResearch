const express = require("express");
const Passport = require("passport");

const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const logger = require("./lib/middleware/logger");
const passport = require("./lib/middleware/passport");
const sessions = require("./lib/middleware/sessions");
const user = require("./lib/models/user");

expressServiceWith(app => {
  genericExpressService(app);
  logger(app);
  sessions(app);
  passport(app);

  app.post(
    "/api/authentication/local",
    Passport.authenticate("local"),
    (req, res) => {
      res.send(req.session);
    }
  );

  app.get("/api/authentication/logout", (req, res) => {
    console.log("req headers", req.headers);
    console.log("req session", req.session);
    console.log("req user", req.user);

    req.session.destroy();
    req.logout();

    res.sendStatus(200);
  });
});
