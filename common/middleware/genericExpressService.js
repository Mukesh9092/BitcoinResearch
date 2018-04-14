import { json } from 'body-parser'
import cors from 'cors'

export default function genericExpressService(app) {
  app.use(json())
  app.use(cors())
}
