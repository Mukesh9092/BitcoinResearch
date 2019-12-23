// @ts-ignore
import { json, urlencoded } from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
import * as uuid from 'uuid/v4'
import { createNextApplication } from './next-application'
import { createPassportApplication } from './passport-application'

const SECRET = 'keyboardcat'

export const createExpressServer = async () => {
  // @ts-ignore
  // preserve typings
  const expressServer: express.Express = express()

  const passportApplication = await createPassportApplication()
  const nextApplication = await createNextApplication()
  const nextApplicationRequestHandler = nextApplication.getRequestHandler()

  // @ts-ignore
  expressServer.use(cookieParser())
  expressServer.use(json())
  expressServer.use(urlencoded({ extended: false }))
  // @ts-ignore
  expressServer.use(session({
    genid: (req) => {
      // @ts-ignore
      return uuid()
    },
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  }))
  expressServer.use(passport.initialize())
  expressServer.use(passport.session())

  expressServer.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  expressServer.post(
    '/signin',
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin',
      failureFlash: true,
    }),
  )

  expressServer.all('*', (req, res) => {
    nextApplicationRequestHandler(req, res)
  })

  return expressServer
}
