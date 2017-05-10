import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from './models/User'

passport.serializeUser((user, cb) => {
  console.log('passport serializeUser', user)

  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  console.log('passport deserializeUser', id)

  // TODO: use DB layer to get user.

  try {
    const user = await User
      .query()
      .where({ id })
      .then(([x]) => x)

    console.log('passport deserializeUser user', id, user)

    if (!user) {
      cb(new Error('Not Found'))
    }

    cb(null, user.toJSON())
  } catch (error) {
    cb(error)
  }
})

passport.use(new LocalStrategy(async (email, password, cb) => {
  console.log('passport LocalStrategy', email, password)

  try {
    const [user] = await User
      .query()
      .where({ email, password })

    cb(null, user.toJSON())
  } catch (error) {
    cb(error)
  }
}))
