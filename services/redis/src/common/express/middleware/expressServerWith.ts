import * as express from 'express'
import { createServer, Server } from 'http'

export type ExpressServer = {
  server?: Server
} & express.Express

export type ExpressServerWithMiddleware = (expressServer: ExpressServer) => Promise<ExpressServer>

export async function expressServerWith(middleware: ExpressServerWithMiddleware, host: string, port: number) {
  // @ts-ignore
  const expressServer: ExpressServer = express()

  await middleware(expressServer)

  expressServer.server = createServer(expressServer)

  expressServer.server.listen(port, 511, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

  return expressServer
}
