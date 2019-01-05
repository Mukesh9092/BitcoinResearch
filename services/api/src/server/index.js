import dotenv from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'

import resolvers from './resolvers'
import { ensureInitialData } from './ensure-initial-data'
import { ensureMarkets } from './ensure-markets'

dotenv.config()

const {
  HOSTNAME,
  APP_HOST,
  APP_PORT,
  APP_PORT_IN,
  PRISMA_HOST,
  PRISMA_PORT,
  PRISMA_PORT_IN
} = process.env

const server = new GraphQLServer({
  port: APP_PORT_IN,
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: '../common/domain/datamodel.prisma.gen.graphql',
      endpoint: `${PRISMA_HOST}:${PRISMA_PORT}`,
    }),
  }),
})

async function start() {
  console.log('Starting import.')

  await ensureInitialData()
  await ensureMarkets()

  console.log('Import complete.')

  server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
}

start()
