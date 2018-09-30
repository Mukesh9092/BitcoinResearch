import morgan from 'morgan'

import { isDevelopment } from '../../lib/environment'

const requestMatches = (req) => isDevelopment() && Boolean(req.url.match(/^\/_next/))

export default function logger(app) {
  if (isDevelopment) {
    app.use(morgan('dev', { skip: requestMatches }))
  } else {
    app.use(morgan('common', { skip: requestMatches }))
  }
}
