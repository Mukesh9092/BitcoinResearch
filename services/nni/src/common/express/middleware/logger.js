import { Request } from 'express'
import morgan from 'morgan'

import { isDevelopment } from '../../environment'

function requestMatches(req) {
  return isDevelopment() && Boolean(req.url.match(/_next/))
}

export function logger(app) {
  if (isDevelopment()) {
    app.use(morgan('dev', { skip: requestMatches }))
  } else {
    app.use(morgan('common', { skip: requestMatches }))
  }

  return app
}
