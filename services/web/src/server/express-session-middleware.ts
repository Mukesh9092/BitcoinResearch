import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import { createClient } from 'redis'
import * as uuid from 'uuid/v4'

const SECRET = 'keyboardcat'
const REDIS_HOST = String(process.env.REDIS_HOST)
const REDIS_PORT = Number(process.env.REDIS_PORT)

const redisClient = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
})
// @ts-ignore
const RedisStore = connectRedis(session)

// @ts-ignore
export default session({
  store: new RedisStore({ client: redisClient }),
  genid: (req) => {
    // @ts-ignore
    return uuid()
  },
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
})
