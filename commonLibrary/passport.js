const LocalStrategy = require("passport-local");
const bodyParser = require('body-parser')
const connectRedis = require("connect-redis");
const cookieParser = require('cookie-parser')
const expressSession = require("express-session");
const passport = require("passport");

const user = require("./models/user");

const {
  REDIS_HOST,
  REDIS_PORT,
  SERVICE_SECRET,
} = process.env;

const RedisStore = connectRedis(expressSession);

const redisStore = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT
});

const localStrategyImplementation = (email, password, cb) => {
  console.log('commonLibrary/passport localStrategyImplementation', email, password);

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

const setupPassport = (app) => {
  passport.serializeUser((user, cb) => {
    console.log('commonLibrary/passport serializeUser', user)
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    console.log('commonLibrary/passport deserializeUser', id)
    user.getUserById(id).then((result) => {
      console.log('commonLibrary/passport deserializeUser result', result)
      cb(null, result)
    }).catch(cb);
  });

  passport.use(localStrategy);

  app
    .use(cookieParser())
    .use(bodyParser.json())

    .use(
      expressSession({
        secret: SERVICE_SECRET,
        cookie: {
          path: "/",
          httpOnly: true,
          sameSite: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 365
        },
        saveUninitialized: false,
        resave: false,
        //rolling: true,
        rolling: false,
        store: redisStore
      })
    )
    .use(passport.initialize())
    .use(passport.session());
}

const setupPassportLocalEndpoint = (app) => {
  app.post(
    "/api/authentication/local",
    passport.authenticate("local"),
    (req, res, ...args) => {
      res.send(user.toJSON(req.user));
    }
  );
}

module.exports = {
  setupPassport,
  setupPassportLocalEndpoint,
};
