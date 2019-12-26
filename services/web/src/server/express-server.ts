import { ApolloServer } from 'apollo-server-express'
import { json, urlencoded } from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { importSchema } from 'graphql-import'
import { ExpressServer } from '../common/express/middleware/expressServerWith'
import context from './context'
import expressSessionMiddleware from './express-session-middleware'
import { createNextApplication } from './next-application'
import passport from './passport'
import resolvers from './resolvers'

export const configureExpressServer = async (expressServer: ExpressServer) => {
  const nextApplication = await createNextApplication()
  const nextApplicationRequestHandler = nextApplication.getRequestHandler()

  const apolloServer = new ApolloServer({
    typeDefs: importSchema('./src/server/datamodel.graphql'),
    resolvers,
    context,
  })

  // @ts-ignore
  expressServer.use(cookieParser())
  expressServer.use(json())
  expressServer.use(urlencoded({ extended: false }))
  expressServer.use(expressSessionMiddleware)
  expressServer.use(passport.initialize())
  expressServer.use(passport.session())

  expressServer.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  // expressServer.post('/signin', passport.authenticate('local', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/signin'
  // }))

  // TODO: Find out how to set cookie from here, use it instead of the above
  expressServer.post('/api/signin', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        next(error)
        return
      }
      if (!user) {
        res.json(info)
        return
      }
      req.login(user, (error) => {
        if (error) {
          next(error)
          return
        }

        res.json({ userId: user.id })
      })
    })(req, res, next)
  })

  apolloServer.applyMiddleware({ app: expressServer })

  expressServer.all('*', (req, res) => {
    nextApplicationRequestHandler(req, res)
  })

  return expressServer
}
