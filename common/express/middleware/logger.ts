import { Request } from 'express'
import morgan from 'morgan'

import { isDevelopment } from '../../environment'
import { IApplicationWithHTTPServer } from '../types'

function requestMatches (req: Request): boolean {
  return isDevelopment() && Boolean(req.url.match(/_next/))
}

export function logger (app: IApplicationWithHTTPServer): IApplicationWithHTTPServer {
  if (isDevelopment()) {
    app.use(morgan('dev', { skip: requestMatches }))
  } else {
    app.use(morgan('common', { skip: requestMatches }))
  }

  return app
}
