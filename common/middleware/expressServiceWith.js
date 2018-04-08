import { createServer } from 'http'

import express from 'express'

import { log } from '../../common/log'

export default async function expressServiceWith(middleware, host, port) {
  let app = express()

  app.server = createServer(app)

  app = await middleware(app)

  app.server.listen(port, host, error => {
    if (error) {
      log.error(error)
      return
    }

    log.info(`HTTP Server listening at http://${host}:${port}.`)
  })
}
