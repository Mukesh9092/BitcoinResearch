import { NextFunction, Response } from 'express'
import { IApplicationWithHTTPServer, IAuthenticatedRequest } from '../types'

export function healthCheck (app: IApplicationWithHTTPServer): IApplicationWithHTTPServer {
  app.get('/healthcheck', (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    res.json({
      health: 'ok',
    })
  })

  return app
}
