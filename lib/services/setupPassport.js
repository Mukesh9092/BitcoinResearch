const LocalStrategy = require("passport-local");
const passport = require("passport");

const formatError = require("../errors")
const user = require("../models/user");

passport.serializeUser((user, cb) => {
  console.log("passport serializeUser", user);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log("passport deserializeUser", id);

  user
    .getUserById(id)
    .then(result => {
      console.log("passport deserializeUser result", result);
      cb(null, result);
    })
    .catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  session: true
}, (email, password, cb) => {
  console.log("passport localStrategyImplementation", email, password);

  user
    .getUserByEmailPassword(email, password)
    .then(user => cb(null, user))
    .catch(error => {
      cb(null, false, { message: formatError(error) });
    });
}));

module.exports = (app) => {
  app
    .use(passport.initialize())
    .use(passport.session());
};
