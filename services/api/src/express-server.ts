import { ApolloServer } from 'apollo-server-express'
import { json, urlencoded } from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { importSchema } from 'graphql-import'
import { ExpressServer } from './common/express/middleware/expressServerWith'
import context from './context'
import resolvers from './resolvers'

export const configureExpressServer = async (expressServer: ExpressServer) => {
  const apolloServer = new ApolloServer({
    typeDefs: importSchema('./src/datamodel.graphql'),
    resolvers,
    context,
  })

  // @ts-ignore
  expressServer.use(cookieParser())
  expressServer.use(json())
  expressServer.use(urlencoded({ extended: false }))

  // expressServer.use(expressSessionMiddleware)
  // expressServer.use(passport.initialize())
  // expressServer.use(passport.session())

  apolloServer.applyMiddleware({ app: expressServer })

  return expressServer
}
