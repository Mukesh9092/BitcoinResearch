import LocalStrategy from "passport-local";
import passport from "passport";

import store from "../database/store";
import { formatError } from "../errors";
import { genRandomString, sha512 } from "../crypto";

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

async function deserializeUser(id: string, cb: Function) {
  try {
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
}

passport.deserializeUser(deserializeUser);

async function localStrategy(email: string, password: string, cb: Function) {
  // console.log("Passport LocalStrategy", email, password);

  try {
    const [user] = await store.findAll("user", {
      where: {
        email
      }
    });

    // console.log("Passport LocalStrategy user", user);

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true
    },
    localStrategy
  )
);

export default function passportMiddleware(app: Object) {
  app.use(passport.initialize()).use(passport.session());
}
