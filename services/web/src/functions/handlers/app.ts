import next from 'next'
import { getServer } from '../common/express-server'

const app = async (req, res) => {
  try {
    const nextServer = next({ conf: { distDir: 'next' } })
)

    const server = await getServer({
      nextServer: nextServer
    })

    await server(req, res)
  } catch (error) {
    console.error(error)
  }
}

export default app
