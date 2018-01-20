import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Application } from "express";
import { promisify } from "util";

import User from "../database/entities/User";
import client from "../database/client";
import { formatError } from "../errors";
import { genRandomString, sha512 } from "../crypto";

passport.serializeUser((user: User, cb) => {
  cb(null, user.id);
});

async function deserializeUser(id: string, cb: Function) {
  try {
    // console.log("Passport deserializeUser id", id);

    const connection = await client();
    const userRepository = connection.getRepository('User');

    const result = await userRepository.findOneById(id);

    // console.log("Passport deserializeUser result", result);

    cb(null, result);
  } catch (error) {
    console.log(formatError(error));
    cb(error);
  }
}

passport.deserializeUser(deserializeUser);

async function localStrategy(email: string, password: string, cb: Function) {
  // console.log("Passport LocalStrategy", email, password);

  try {
    const connection = await client();
    const userRepository = connection.getRepository('User');

    const user = await userRepository.findOne({ email });

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
      // session: true
    },
    localStrategy
  )
);

export default function passportMiddleware(app: Application) {
  app
    .use(passport.initialize())
    .use(passport.session());
}
