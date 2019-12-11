import { json } from 'body-parser'
import cors from 'cors'

export function genericExpressService(app) {
  app.use(json())
  app.use(cors())

  return app
}
