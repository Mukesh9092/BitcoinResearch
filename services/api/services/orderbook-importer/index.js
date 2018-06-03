import WebSocket from 'ws'
import fetch from 'isomorphic-fetch'
import ccxt from 'ccxt'

import { act } from '../../common/hemera/client'
import { log } from '../../common/log'

let websocketConnection

async function writeMessage(streamName, eventType, data) {
  return act({
    pubsub$: true,
    topic: 'OrderBookEvents',
    cmd: eventType,
    data,
  })
}

async function fetchOrderBookState(key) {
  try {
    const upperCaseKey = key.toUpperCase()
    const url = `https://www.binance.com/api/v1/depth?symbol=${upperCaseKey}&limit=1000`

    const response = await fetch(url)
    const result = await response.json()

    const outgoingMessage = {
      key,
      lastUpdateId: result.lastUpdateId,
      bids: result.bids,
      asks: result.asks,
    }

    await writeMessage('OrderBookEvents', 'state', outgoingMessage)
  } catch (error) {
    log.error(error)
  }
}

async function handleWebsocketMessage(message) {
  try {
    const parsedIncomingMessage = JSON.parse(message)

    const { e, E, s, U, u, b, a } = parsedIncomingMessage

    const outgoingMessage = {
      type: e,
      time: E,
      key: s,
      firstId: U,
      lastId: u,
      bids: b.map((bid) => {
        return {
          price: bid[0],
          amount: bid[1],
        }
      }),
      asks: a.map((ask) => {
        return {
          price: ask[0],
          amount: ask[1],
        }
      }),
    }

    // log.debug({ outgoingMessage })

    await writeMessage('OrderBookEvents', 'update', outgoingMessage)
  } catch (error) {
    log.error(error)
  }
}

async function openWebsocketConnection(key) {
  const streamName = `${key}@depth`
  const url = `wss://stream.binance.com:9443/ws/${streamName}`

  if (websocketConnection) {
    websocketConnection.close()
  }

  log.info(`Opening Websocket connection to ${url}`)

  websocketConnection = new WebSocket(url, { perMessageDeflate: false })
  websocketConnection.on('open', () => {
    fetchOrderBookState(key)

    log.info(`Websocket connection opened with ${url}`)
  })

  websocketConnection.on('message', handleWebsocketMessage)
}

async function start() {
  try {
    const key = 'ethbtc'
    openWebsocketConnection(key)
  } catch (error) {
    log.error(error)
  }
}

setInterval(start, 1000 * 60 * 60 * 24)

start()
