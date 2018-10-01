import { createServer } from 'http'

import express from 'express'

export default async function expressServiceWith(middleware, host, port) {
  const app = express()

  await middleware(app)

  app.server = createServer(app)

  app.server.listen(port, host, (error) => {
    if (error) {
      console.error(error)
      return
    }

    console.log(`HTTP Server listening at http://${host}:${port}.`)
  })
}
