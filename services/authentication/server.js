import passport from 'passport'
import unhandledError from 'unhandled-error'

import expressServiceWith from './common/middleware/expressServiceWith'
import genericExpressService from './common/middleware/genericExpressService'
import loggerMiddleware from './common/middleware/logger'
import passportMiddleware from './common/middleware/passport'
import sessionsMiddleware from './common/middleware/sessions'
import { localAuthentication, logout } from './routes'
import { log } from './common/log'

const { AUTHENTICATION_HOST, AUTHENTICATION_PORT } = process.env

expressServiceWith(
  async app => {
    genericExpressService(app)
    loggerMiddleware(app)
    sessionsMiddleware(app)
    passportMiddleware(app)

    app.post(
      '/api/authentication/local',
      passport.authenticate('local'),
      localAuthentication,
    )
    app.get('/api/authentication/logout', logout)

    return app
  },
  String(AUTHENTICATION_HOST),
  Number(AUTHENTICATION_PORT),
)

unhandledError(error => log.error(error))
