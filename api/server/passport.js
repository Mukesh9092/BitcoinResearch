const LocalStrategy = require("passport-local");
const connectRedis = require("connect-redis");
const expressSession = require("express-session");
const passport = require("passport");
const { OAuthStrategy: GoogleStrategy } = require("passport-google-oauth");

const user = require("../lib/models/user");

const { REDIS_HOST, REDIS_PORT } = process.env;

const RedisStore = connectRedis(expressSession);

const redisStore = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT
});

const localStrategyImplementation = (email, password, cb) => {
  user
    .getUserByEmailPassword(email, password)
    .then(user => cb(null, user))
    .catch(error => {
      cb(null, false, { message: error.message || error });
    });
};

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: true
  },
  localStrategyImplementation
);

function setupPassport(app) {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    user.getUserById(id).then(result => cb(null, result)).catch(cb);
  });

  passport.use(localStrategy);

  app
    .use(
      expressSession({
        secret: app.keys[0],
        cookie: {
          path: "/",
          httpOnly: true,
          sameSite: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 365
        },
        saveUninitialized: false,
        resave: false,
        rolling: true,
        store: redisStore
      })
    )
    .use(passport.initialize())
    .use(passport.session());

  app.post(
    "/api/authentication/local",
    passport.authenticate("local"),
    (req, res, ...args) => {
      res.send(user.toJSON(req.user));
    }
  );
}

module.exports = {
  setupPassport
};
