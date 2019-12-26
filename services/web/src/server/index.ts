import { expressServerWith } from '../common/express/middleware/expressServerWith'
import { configureExpressServer } from './express-server'

const host = String(process.env.WEB_HOST)
const port = Number(process.env.WEB_PORT)

const main = async () => {
  try {
    await expressServerWith(configureExpressServer, host, port)
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error)
