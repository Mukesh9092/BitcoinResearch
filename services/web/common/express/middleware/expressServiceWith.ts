import express from 'express'
import { createServer } from 'http'

import { IApplicationWithHTTPServer } from '../types'

export async function expressServiceWith (
  middleware: (app: IApplicationWithHTTPServer) => Promise<IApplicationWithHTTPServer>,
  host: string,
  port: number,
): Promise<IApplicationWithHTTPServer> {
  const app: IApplicationWithHTTPServer = express()

  await middleware(app)

  app.server = createServer(app)

  app.server.listen(port, host, (error: Error) => {
    if (error) {
      console.error(error)

      return
    }

    console.log(`HTTP Server listening at http://${host}:${port}.`)
  })

  return app
}
