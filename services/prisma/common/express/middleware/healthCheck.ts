import { Request, Response, NextFunction } from 'express'
import { ApplicationWithHTTPServer, AuthenticatedRequest } from '../types'

export default function healthCheck(app: ApplicationWithHTTPServer) {
  app.get('/healthcheck', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res.json({
      health: 'ok',
    })
  })
}
