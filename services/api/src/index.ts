import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import { importSchema } from 'graphql-import'
import context from './context'
import { ensureInitialData } from './importer/ensure-initial-data'
import resolvers from './resolvers'

dotenv.config()

const main = async () => {
  try {
    console.log('main')

    const API_PORT_IN = Number(process.env.API_PORT_IN)
    console.log('main:API_PORT_IN', API_PORT_IN)

    console.log('main:initial-data')
    await ensureInitialData()
    console.log('main:initial-data:complete')

    const apolloServer = new ApolloServer({
      typeDefs: importSchema('./src/datamodel.graphql'),
      resolvers,
      context,
    })

    const { url } = await apolloServer.listen({
      port: API_PORT_IN,
    })
    console.log('main:url', url)
  } catch (error) {
    console.error(error)
  }
}

main()
