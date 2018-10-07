import { Response, NextFunction } from 'express'

import { ApplicationWithHTTPServer, AuthenticatedRequest } from '../types'

export default function authenticationHeaderExtraction(app: ApplicationWithHTTPServer) {
  app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user: string = String(req.headers['x-user'])
      const session: string = String(req.headers['x-session'])

      req.authentication = {
        user: user === '' ? null : JSON.parse(String(user)),
        session: session === '' ? null : JSON.parse(String(session)),
      }

      next()
    } catch (error) {
      next(error)
    }
  })
}
