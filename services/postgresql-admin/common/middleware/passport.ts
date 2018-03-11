import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Application } from 'express';
import { promisify } from 'util';

import { getKnexClient } from '../database/knex-client';
import { formatError } from '../errors';
import { verifyPassword } from '../crypto';

passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});

async function deserializeUser(id: string, cb: Function) {
  try {
    // console.log('Passport deserializeUser id', id);

    const knexClient = getKnexClient();

    const result = await knexClient.select('*').where({ id });

    // console.log('Passport deserializeUser result', result);

    cb(null, result);
  } catch (error) {
    console.log(formatError(error));
    cb(error);
  }
}

passport.deserializeUser(deserializeUser);

async function localStrategy(email: string, password: string, cb: Function) {
  try {
    // console.log('Passport LocalStrategy', email, password);

    const knexClient = getKnexClient();

    const user = await knexClient.select('*').where({ email });

    // console.log('Passport LocalStrategy user', user);

    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password' });
    }

    const verified = verifyPassword(password, user.passwordHash);

    // console.log('Passport LocalStrategy verified', verified);

    if (!verified) {
      return cb(null, false, { message: 'Incorrect email or password' });
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
      usernameField: 'email',
      passwordField: 'password',
      // session: true
    },
    localStrategy,
  ),
);

export default function passportMiddleware(app: Application) {
  app.use(passport.initialize()).use(passport.session());
}
