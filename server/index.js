const next = require('next')

const app = require('./app')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev })
const handleRequest = nextApp.getRequestHandler()

nextApp.prepare()
  .then(() => {
    app.get('*', (req, res) => {
      handleRequest(req, res)
    })

    app.listen(port, (error) => {
      if (error) {
        throw error
      }

      console.log(`> Ready on http://localhost:${port}`)
    })
  })
