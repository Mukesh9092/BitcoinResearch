import { createExpressServer } from './express-server'

const port = Number(process.env.WEB_PORT)

const main = async () => {
  try {
    const expressServer = await createExpressServer()

    expressServer.listen(port, (error) => {
      if (error) {
        console.error(error)
        return
      }

      console.log(`Listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main().catch(console.error)
