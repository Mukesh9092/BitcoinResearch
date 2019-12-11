import { json } from 'body-parser'
import ccxt from 'ccxt'
import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { isDevelopment } from './common/environment'

const PORT = Number(process.env.TRADER_PORT_IN)
console.log(`PORT=${PORT}`)

const expressServer = express()

expressServer.use(json())
expressServer.use(cors())

if (isDevelopment()) {
  expressServer.use(morgan('dev'))
} else {
  expressServer.use(morgan('common'))
}

expressServer.get('/healthcheck', (_req: Request, res: Response) => {
  res.json({
    health: 'ok',
  })
})

const binance = new ccxt.binance()
const poloniex = new ccxt.poloniex()

const exchanges = {
  binance,
  poloniex,
}

expressServer.get('/traders/:name', (req: Request, res: Response) => {
  const name = req.params.name

  // TODO: - Fetch the Exchange from the DB.
  //         - GraphQL Client of Keystone Service
  //       - Find Periodic channel in Service to keep DB up to date with ccxt
  //       - Set 24 hour update of exchanges.

  res.json({
    name
  })
})

expressServer.listen(PORT, (error: Error) => {
  if (error) {
    console.error(error)
  }

  console.log(`Listening on 0.0.0.0:${PORT}`)
})
