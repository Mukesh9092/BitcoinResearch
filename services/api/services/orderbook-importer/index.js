import Poloniex from 'poloniex-api-node'

import { act } from '../../common/hemera/client'
import { importCurrencyPairs } from '../../common/database/repositories/currency-pair'
import { log } from '../../common/log'

async function writeMessage(streamName, eventType, data) {
  try {
    const result = await act({
      pubsub$: true,
      topic: 'OrderBookEvents',
      cmd: eventType,
      data: data,
    })

    return result
  } catch (error) {
    throw error
  }
}

async function orderBook(streamName, marketKey, message) {
  await writeMessage(streamName, 'orderBook', {
    marketKey,
    bids: message.data.bids,
    asks: message.data.asks,
  })
}

async function orderBookModify(streamName, marketKey, message) {
  await writeMessage(streamName, 'orderBookModify', {
    marketKey,
    mutationType: 'modify',
    mutationSide: message.data.type,
    rate: message.data.rate,
    amount: message.data.amount,
  })
}

async function orderBookRemove(streamName, marketKey, message) {
  await writeMessage(streamName, 'orderBookRemove', {
    marketKey,
    mutationType: 'remove',
    mutationSide: message.data.type,
    rate: message.data.rate,
    amount: message.data.amount,
  })
}

async function orderBookNewTrade(streamName, marketKey, message) {
  await writeMessage(streamName, 'orderBookNewTrade', {
    marketKey,
    mutationType: 'trade',
    mutationSide: message.data.type,
    tradeID: message.data.tradeID,
    rate: message.data.rate,
    amount: message.data.amount,
    total: message.data.total,
    date: message.data.date,
  })
}

const handlers = {
  orderBook,
  orderBookModify,
  orderBookRemove,
  newTrade: orderBookNewTrade,
}

async function handleMessages(marketKey, unsanitizedMessages, seq) {
  try {
    for (let index = 0; index < unsanitizedMessages.length; index++) {
      const message = unsanitizedMessages[index]

      const streamName = `OrderBook_${marketKey}`

      const handler = handlers[message.type]

      if (!handler) {
        return
      }

      handler(streamName, marketKey, message)
    }
  } catch (error) {
    log.error(error)
  }
}

async function handleOpen() {
  log.info('Poloniex Websocket Open')
}

async function handleClose(reason, details) {
  log.info('Poloniex Websocket Closed')
}

async function handleError(error) {
  log.error(error)
}

async function start() {
  try {
    const poloniexClient = new Poloniex()
    const currencyPairs = await importCurrencyPairs()

    currencyPairs.forEach(({ key }) => poloniexClient.subscribe(key))

    poloniexClient.on('open', handleOpen)
    poloniexClient.on('close', handleClose)
    poloniexClient.on('error', handleError)
    poloniexClient.on('message', handleMessages)

    log.info('Opening Poloniex Websocket')
    poloniexClient.openWebSocket({ version: 2 })
  } catch (error) {
    throw error
  }
}

start()
