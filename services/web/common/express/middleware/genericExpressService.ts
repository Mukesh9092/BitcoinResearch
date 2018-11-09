import { json } from 'body-parser'
import cors from 'cors'

import { IApplicationWithHTTPServer } from '../types'

export function genericExpressService (app: IApplicationWithHTTPServer): IApplicationWithHTTPServer {
  app.use(json())
  app.use(cors())

  return app
}
