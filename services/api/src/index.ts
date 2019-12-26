import { expressServerWith } from './common/express/middleware/expressServerWith'
import { configureExpressServer } from './express-server'
import { ensureInitialData } from './importer/ensure-initial-data'

const host = String(process.env.API_HOST)
const port = Number(process.env.API_PORT)

const main = async () => {
  try {
    await ensureInitialData()
    await expressServerWith(configureExpressServer, host, port)
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error)
