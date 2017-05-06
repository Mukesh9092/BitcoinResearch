const log = require('loglevel')
const next = require('next')

const app = require('./app')

const { PORT, NODE_ENV } = process.env

const logLevel = NODE_ENV === 'production' ? 'info' : 'debug'

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
})
const handleRequest = nextApp.getRequestHandler()

log.info(`Setting loglevel to: ${logLevel}`)
log.setLevel(logLevel)

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    handleRequest(req, res)
  })

  app.listen(PORT, (error) => {
    if (error) {
      throw error
    }

    log.info(`> Ready on http://0.0.0.0:${PORT}`)
  })
})
