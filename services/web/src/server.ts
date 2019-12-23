// @ts-ignore
// const express = require('express')
// const next = require('next')
// const { createExpressServer } = require('./express-server')

import next from 'next'
import { createExpressServer } from './express-server'

const port = Number(process.env.WEB_PORT)
const dev = process.env.NODE_ENV !== 'production'

const main = async () => {
  try {
    const expressServer = await createExpressServer()

    const nextApplicationOptions = {
      dev,
      dir: './src',
    }
    console.log('next options', nextApplicationOptions)
    const nextApplication = next(nextApplicationOptions)

    const nextRequestHandler = nextApplication.getRequestHandler()

    await nextApplication.prepare()

    expressServer.all('*', (req, res) => {
      nextRequestHandler(req, res)
    })

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
