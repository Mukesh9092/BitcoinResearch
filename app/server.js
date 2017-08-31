const path = require("path");

const express = require("express");
const next = require("next");

const { passport, setupPassport } = require("./commonLibrary/passport");

const { NODE_ENV, APP_HOST, APP_PORT } = process.env;

const dev = process.env.NODE_ENV !== "production";

const nextApplication = next({ dev });
const nextApplicationRequestHandler = nextApplication.getRequestHandler();

const app = express();

setupPassport(app);

app.get("*", (req, res, next) => {
  console.log("REQUEST", req.url, req.headers);

  passport.authenticate("local", (error, user, info) => {
    console.log("Passport Authenticate", error, user, info);

    if (error) {
      console.log("Passport Authenticate ERROR:", error);
      return;
    }

    if (!user) {
      console.log("Passport Authenticate NO USER", info);
    }

    console.log("Passport Authenticate USER", user);

    req.login(user, error => {
      console.log("Passport Authenticate AFTER LOGIN", error);

      if (error) {
        console.log("Passport Authenticate AFTER LOGIN ERROR", error);
        return;
      }

      nextApplicationRequestHandler(req, res, next);
    });
  })(req, res, next);
});

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
  .catch(error => {
    console.error(error);
  });
