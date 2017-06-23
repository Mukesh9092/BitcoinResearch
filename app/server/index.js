const Router = require('koa-router')
const log = require('loglevel')
const next = require('next')

const app = require('./app')

const {
  NODE_ENV,
  APP_HOST,
  APP_PORT,
} = process.env

const logLevel = NODE_ENV === 'develop' ? 'debug' : 'info'
log.info(`Setting loglevel to: ${logLevel}`)
log.setLevel(logLevel)

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
})
const handleRequest = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    const router = new Router()

    router.get('*', (ctx) => {
      handleRequest(ctx.req, ctx.res)
      ctx.respond = false
    })

    app
      // Required to integrate Koa.js and Next.js.
      .use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
      })
      .use(router.routes())

    app.listen(APP_PORT, APP_HOST, (error) => {
      if (error) {
        throw error
      }

      log.info(`> Ready on http://${APP_HOST}:${APP_PORT}`)
    })
  })
