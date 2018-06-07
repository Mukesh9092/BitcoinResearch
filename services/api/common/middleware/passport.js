import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { promisify } from 'util'

import { log } from '../../common/log'

import { getKnexClient } from '../database/knex-client'
import { formatError } from '../errors'
import { verifyPassword } from '../crypto'

passport.serializeUser((user, cb) => {
  log.debug('Passport serializeUser', user)

  cb(null, user.id)
})

async function deserializeUser(id, cb) {
  try {
    log.debug('Passport deserializeUser id', id)

    const knexClient = getKnexClient()

    const result = await knexClient.select('*').where({ id })

    log.debug('Passport deserializeUser result', result)

    cb(null, result)
  } catch (error) {
    log.debug(formatError(error))
    cb(error)
  }
}

passport.deserializeUser(deserializeUser)

async function localStrategy(email, password, cb) {
  try {
    log.debug('Passport LocalStrategy', email, password)

    const knexClient = getKnexClient()

    const user = await knexClient.select('*').where({ email })

    log.debug('Passport LocalStrategy user', user)

    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password' })
    }

    const verified = verifyPassword(password, user.passwordHash)

    log.debug('Passport LocalStrategy verified', verified)

    if (!verified) {
      return cb(null, false, { message: 'Incorrect email or password' })
    }

    cb(null, user)
  } catch (error) {
    log.debug(formatError(error))
    cb(error)
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    localStrategy,
  ),
)

export default function passportMiddleware(app) {
  app.use(passport.initialize()).use(passport.session())
}
