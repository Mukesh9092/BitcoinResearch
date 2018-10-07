import { createServer } from 'http'
import * as express from 'express'

import { ApplicationWithHTTPServer } from '../types'

export default async function expressServiceWith(middleware: Function, host: string, port: number) {
  const app: ApplicationWithHTTPServer = express()

  await middleware(app)

  app.server = createServer(app)

  app.server.listen(host, port, (error: Error) => {
    if (error) {
      console.error(error)
      return
    }

    console.log(`HTTP Server listening at http://${host}:${port}.`)
  })
}
