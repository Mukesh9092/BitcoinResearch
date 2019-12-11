const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { KnexAdapter } = require('@keystonejs/adapter-knex')

const AssetList = require('./lists/Asset')
const PeriodList = require('./lists/Period')
const TraderList = require('./lists/Trader')
const UserList = require('./lists/User')
const OHLCVList = require('./lists/OHLCV')

const PROJECT_NAME = 'SmallCrypto'
const { POSTGRESQL_HOST, POSTGRESQL_PORT_IN, POSTGRESQL_USER, POSTGRESQL_PASSWORD } = process.env
const POSTGRESQL_DB = 'keystone'
const POSTGRESQL_URI = `postgres://${POSTGRESQL_USER}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT_IN}/${POSTGRESQL_DB}`

console.log('PROJECT_NAME', PROJECT_NAME)
console.log('POSTGRESQL_DB', POSTGRESQL_DB)
console.log('POSTGRESQL_URI', POSTGRESQL_URI)

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new KnexAdapter({
    knexOptions: {
      client: 'postgres',
      connection: POSTGRESQL_URI,
    },
  }),
})

keystone.createList('Asset', AssetList)
keystone.createList('OHLCV', OHLCVList)
keystone.createList('Period', PeriodList)
keystone.createList('Trader', TraderList)
keystone.createList('User', UserList)

const start = async () => {
  try {
    await keystone.prepare()
    await keystone.connect()

    await keystone.createItems({
      Trader: [
        {
          name: 'Binance',
        },
      ],
      Asset: [
        {
          name: 'BTCUSDT',
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: 'ETHUSDT',
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: 'MATICUSDT',
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: 'BNBUSDT',
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
      ],
      Period: [
        {
          name: '1m',
          inMilliseconds: 1000 * 60,
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: '5m',
          inMilliseconds: 1000 * 60 * 5,
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: '1h',
          inMilliseconds: 1000 * 60 * 60,
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
        {
          name: '1d',
          inMilliseconds: 1000 * 60 * 60 * 24,
          trader: {
            where: {
              name: 'Binance',
            },
          },
        },
      ],
      User: [
        {
          name: 'admin',
          email: 'tom.wieland@gmail.com',
          isAdmin: true,
          password: 'development',
        },
      ],
    })

    console.log('Complete!')
  } catch (error) {
    console.error(error)
  }
}

start()

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    // To create an initial user you can temporarily remove the authStrategy below
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
  ],
}
