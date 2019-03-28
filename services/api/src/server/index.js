import dotenv from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'

import { Prisma } from 'prisma-binding'

import { ensureInitialData } from './importer/ensure-initial-data'

import { createChart } from './resolvers/Mutation/createChart'
import { deleteChart } from './resolvers/Mutation/deleteChart'
import { getCurrentUser } from './resolvers/Query/getCurrentUser'
import { getMarkets } from './resolvers/Query/getMarkets'
import { getOHLCVs } from './resolvers/Query/getOHLCVs'

dotenv.config()

const { APP_PORT_IN, PRISMA_HOST, PRISMA_PORT } = process.env

const resolvers = {
  Query: {
    getCurrentUser,
    getMarkets,
    getOHLCVs,
  },

  Mutation: {
    createChart,
    deleteChart,
  },
}

const context = (req) => {
  return {
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/datamodel.prisma.gen.graphql',
      endpoint: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
      debug: true,
    }),
  }
}

const server = new GraphQLServer({
  port: APP_PORT_IN,
  typeDefs: 'src/datamodel.graphql',
  resolvers,
  context,
})

server.start(async () => {
  console.log(`GraphQL server is running on http://localhost:4000`)

  await ensureInitialData()
})
