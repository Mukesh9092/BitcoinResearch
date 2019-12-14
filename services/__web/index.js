require('dotenv').config()

const { resolve } = require('path')

const Bundler = require('parcel-bundler')
const express = require('express')

const { WEB_HOST, WEB_PORT, WEB_HMR_PORT } = process.env

const app = express()

const file = resolve('src/index.html')
const options = {
  logLevel: 3,
  hmrPort: WEB_HMR_PORT,
}

const bundler = new Bundler(file, options)
const middleware = bundler.middleware()

app.use('/rebundle', async (req, res) => {
  console.log('Rebundle start')

  bundler.bundle()

  // bundler = new Bundler(file, options)
  // middleware = bundler.middleware()
  // app.use(middleware)

  console.log('Rebundle complete')

  res.end()
})

app.use(middleware)

app.listen(WEB_PORT, WEB_HOST, () => {
  console.log(`HTTP Server Listening on http://${WEB_HOST}:${WEB_PORT}`)
})
