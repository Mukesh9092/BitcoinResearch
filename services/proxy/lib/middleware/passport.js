const LocalStrategy = require("passport-local");
const passport = require("passport");

const { formatError } = require("../errors");
const user = require("../models/user");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  user
    .getUserById(id)
    .then(result => {
      cb(null, result);
    })
    .catch(error => {
      console.log(formatError(error));
      cb(error);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true
    },
    (email, password, cb) => {
      // console.log('Passport LocalStrategy', email, password)

      user
        .getUserByEmailPassword(email, password)
        .then(user => {
          // console.log('Passport LocalStrategy user', user)

          cb(null, user);
        })
        .catch(error => {
          // console.log(formatError(error))
          cb(null, false, { message: formatError(error) });
        });
    }
  )
);

module.exports = app => {
  app.use(passport.initialize()).use(passport.session());
};
