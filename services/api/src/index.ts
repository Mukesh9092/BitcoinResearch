import { ApolloServer } from 'apollo-server'
import { ContextFunction } from 'apollo-server-core'
import dotenv from 'dotenv'
import { importSchema } from 'graphql-import'
import { Prisma } from 'prisma-binding'
import { ensureInitialData } from './importer/ensure-initial-data'
import resolversModule from './resolvers'

dotenv.config()

const API_PORT_IN = Number(process.env.API_PORT_IN)
const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_PORT)

// Type Checked Resolvers.
const resolvers = resolversModule

const typeDefs = importSchema('./src/datamodel.graphql')

const context: ContextFunction = (req) => {
  return {
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/datamodel.prisma.gen.graphql',
      endpoint: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
      debug: true,
    }),
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

const main = async () => {
  try {
    console.log('main')
    console.log('main:API_PORT_IN', API_PORT_IN)
    console.log('main:PRISMA_HOST', PRISMA_HOST)
    console.log('main:PRISMA_PORT', PRISMA_PORT)

    const { url } = await apolloServer.listen({
      port: API_PORT_IN,
    })

    console.log(`GraphQL server is running on ${url}`)

    await ensureInitialData()

    console.log(`Seeded initial data`)
  } catch (error) {
    console.error(error)
  }
}

main()
