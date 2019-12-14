import { FirestoreStore } from '@google-cloud/connect-firestore'
import { Firestore } from '@google-cloud/firestore'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { Checkbox, Password, Text } from '@keystonejs/fields'
import { Keystone } from '@keystonejs/keystone'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import expressSession from 'express-session'
import Server from 'next/dist/next-server/server/next-server'
import { resolve } from 'path'

const PROJECT_NAME = 'SmallCrypto'

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
})

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin)
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false
  }
  return { id: user.id }
}
const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth)
  const isOwner = access.userOwnsItem(auth)
  return isAdmin ? isAdmin : isOwner
}
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner }

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
  // To create an initial user you can temporarily remove access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

const serviceAccountKeyPath = resolve(
  __dirname,
  '../keys/serviceAccountKey.json',
)
const SECRET = 'keyboardcat'

export interface GetServerProps {
  nextServer: Server
}

export async function getServer({
  nextServer,
}: GetServerProps): Promise<express.Express> {
  const expressServer: express.Express = express()

  await nextServer.prepare()
  const { middlewares } = await keystone
    .prepare({
      apps: [
        new GraphQLApp(),
        // To create an initial user you can temporarily remove the authStrategy below
        new AdminUIApp({ enableDefaultRoute: true, authStrategy })
      ],
      dev: process.env.NODE_ENV !== 'production'
    })

  expressServer.use(cookieParser())
  expressServer.use(bodyParser.json())
  expressServer.use(
    expressSession({
      store: new FirestoreStore({
        dataset: new Firestore({
          keyFilename: serviceAccountKeyPath,
          kind: 'express-sessions',
        }),
        kind: 'express-sessions',
      }),
      secret: SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 604800000, // week
      },
    }),
  )

  const nextServerRequestHandler = nextServer.getRequestHandler()

  expressServer.use('/keystone', middlewares)
  expressServer.use('*', (req, res) => nextServerRequestHandler(req, res))

  return expressServer
}
