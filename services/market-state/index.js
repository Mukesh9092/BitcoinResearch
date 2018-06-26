import { add } from './common/hemera/client'
import { log } from './common/log'

import { command } from './common/redis/client'

log.setLevel('debug')

async function start() {
  try {
    await add({ topic: 'Markets', cmd: 'getMarket' }, async (event) => {
      log.debug('getMarket', event)

      const key = `Markets/${event.key}`
      const target = '.'

      const result = await command('JSON.GET', [key, target])

      log.debug('getMarket result', JSON.parse(result))

      return result
    })

    await add({ topic: 'Markets', cmd: 'getMarkets' }, async (event) => {
      log.debug('getMarkets', event)

      const marketKeys = await command('KEYS', ['Markets/*'])

      const results = await Promise.all(
        marketKeys.map(async (marketKey) => {
          return JSON.parse(await command('JSON.GET', [marketKey]))
        }),
      )

      log.debug('getMarkets results', results)

      return results
    })

    await add(
      { pubsub$: true, topic: 'MarketsEvents', cmd: 'state' },
      async ({ data }) => {
        const key = `Markets/${data.id}`
        const target = '.'
        const json = JSON.stringify(data)

        await command('JSON.SET', [key, target, json])

        return true
      },
    )
  } catch (error) {
    log.error(error)
  }
}

start()
