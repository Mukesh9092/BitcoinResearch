const LocalStrategy = require("passport-local");
const passport = require("passport");

const store = require("../database/store");
const { formatError } = require("../errors");
const { genRandomString, sha512 } = require("../crypto");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    console.log("deserializeUser", id);

    const result = await store.find("user", id);

    if (result) {
      cb(null, result.toJSON());
      return;
    }

    cb();
  } catch (error) {
    console.log(formatError(error));
    cb(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true
    },
    async (email, password, cb) => {
      console.log("Passport LocalStrategy", email, password);

      try {
        const [user] = await store.findAll("user", {
          where: {
            email
          }
        });

        console.log("Passport LocalStrategy user", user);

        if (!user) {
          return cb(null, false, { message: "Incorrect email or password" });
        }

        const { passwordHash } = sha512(password, user.password_seed);

        if (user.password_hash !== passwordHash) {
          return cb(null, false, { message: "Incorrect email or password" });
        }

        cb(null, user);
      } catch (error) {
        console.log(formatError(error));
        cb(error);
      }
    }
  )
);

module.exports = app => {
  console.log("passport");

  app.use(passport.initialize()).use(passport.session());
};
