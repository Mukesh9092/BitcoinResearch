import { createServer } from 'http'

import express from 'express'

import { log } from '../log'

export default async function expressServiceWith(middleware, host, port) {
  // log.debug('expressServiceWith')

  const app = express()

  // log.debug('expressServiceWith app?', !!app)

  await middleware(app)

  // log.debug('expressServiceWith app with middleware?', !!app)

  app.server = createServer(app)

  // log.debug('expressServiceWith app.server?', !!app.server)

  app.server.listen(port, host, (error) => {
    // log.debug('expressServiceWith app.server after listen', !!app)

    if (error) {
      log.error(error)
      return
    }

    log.info(`HTTP Server listening at http://${host}:${port}.`)
  })
}
