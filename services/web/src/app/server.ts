import next from 'next'
import { resolve } from 'path'

import { getServer } from '../functions/common/express-server'

async function main(): Promise<void> {
  try {
    const port = Number(process.env.PORT) || 3000
    const dev = process.env.NODE_ENV !== 'production'

    const app = next({ dev, dir: resolve('./src/app') })
    const handle = app.getRequestHandler()

    await app.prepare()

    const server = await getServer({ nextRequestHandler: handle })

    server.listen(port, (error) => {
      if (error) {
        console.error(error)
        return
      }

      console.log(`Listening on port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error)
