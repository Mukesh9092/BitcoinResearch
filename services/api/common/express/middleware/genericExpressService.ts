import { json } from 'body-parser'
import cors from 'cors'

import { ApplicationWithHTTPServer } from '../types'

export default function genericExpressService(app: ApplicationWithHTTPServer) {
  app.use(json())
  app.use(cors())
}
