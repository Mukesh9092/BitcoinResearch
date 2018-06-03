import 'isomorphic-fetch'

import { getHemeraClient } from '../../common/hemera/client'
import { log } from '../../common/log'

const markets = {}

let hemeraClient

async function start() {
  try {
    hemeraClient = await getHemeraClient()
  } catch (error) {
    log.error(error)
  }
}

start()
