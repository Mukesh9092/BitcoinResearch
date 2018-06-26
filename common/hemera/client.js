import { promisify } from 'util'

import Hemera from 'nats-hemera'
import Nats from 'nats'

const { NATS_HOST, NATS_PORT } = process.env

let nats

export async function getNatsClient() {
  if (nats) {
    return nats
  }

  nats = Nats.connect({
    servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
  })

  return nats
}

let hemera

export async function getHemeraClient() {
  if (hemera) {
    return hemera
  }

  const natsClient = await getNatsClient()

  hemera = new Hemera(natsClient, {
    logLevel: 'info',
  })

  await hemera.ready()

  return hemera
}

export async function act(...args) {
  const hemera = await getHemeraClient()

  return promisify(hemera.act.bind(hemera))(...args)
}

export async function add(...args) {
  const hemera = await getHemeraClient()

  hemera.add(...args)
}
