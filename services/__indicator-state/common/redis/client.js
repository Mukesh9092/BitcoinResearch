import { promisify } from 'util'

import redis from 'redis'

const { REDIS_HOST, REDIS_PORT } = process.env

let client

export async function getClient() {
  if (client) {
    return client
  }

  client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
  })

  return client
}

export async function command(...args) {
  const client = await getClient()

  return promisify(client.send_command.bind(client))(...args)
}
