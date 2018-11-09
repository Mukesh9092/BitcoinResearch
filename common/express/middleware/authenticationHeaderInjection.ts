import { NextFunction, Response } from 'express'

import { IApplicationWithHTTPServer, IAuthenticatedRequest } from '../types'

export function authenticationHeaderInjection (app: IApplicationWithHTTPServer): IApplicationWithHTTPServer {
  app.use((req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        user,
        session,
      } = req.authentication

      if (user) {
        req.headers['x-user'] = JSON.stringify(user)
      }

      if (session) {
        req.headers['x-session'] = JSON.stringify(session)
      }

      next()
    } catch (error) {
      next(error)
    }
  })

  return app
}
