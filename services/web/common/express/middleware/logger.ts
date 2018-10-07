import morgan from 'morgan'
import { Request } from 'express'

import { ApplicationWithHTTPServer } from '../types'
import { isDevelopment } from '../../environment'

const requestMatches = (req: Request): boolean => isDevelopment() && Boolean(req.url.match(/^\/_next/))

export default function logger(app: ApplicationWithHTTPServer) {
  if (isDevelopment()) {
    app.use(morgan('dev', { skip: requestMatches }))
  } else {
    app.use(morgan('common', { skip: requestMatches }))
  }
}
