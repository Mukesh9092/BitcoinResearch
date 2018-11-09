import { NextFunction, Response } from 'express'

import { IApplicationWithHTTPServer, IAuthenticatedRequest } from '../types'

export function authenticationHeaderExtraction (app: IApplicationWithHTTPServer): IApplicationWithHTTPServer {
  app.use((req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user: string = String(req.headers['x-user'])
      const session: string = String(req.headers['x-session'])

      req.authentication = {
        session: session === '' ? undefined : JSON.parse(String(session)),
        user: user === '' ? undefined : JSON.parse(String(user)),
      }

      next()
    } catch (error) {
      next(error)
    }
  })

  return app
}
