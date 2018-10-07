import { Response, NextFunction } from 'express'

import { ApplicationWithHTTPServer, AuthenticatedRequest } from '../types'

export default function authenticationHeaderInjection(app: ApplicationWithHTTPServer) {
  app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        user,
        session
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
}
