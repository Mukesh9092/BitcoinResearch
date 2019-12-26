import gql from 'graphql-tag'
import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import { getApolloClient } from '../common/apollo/client'
import { isValidPassword } from '../common/password'

const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_PORT)

const apolloClient = getApolloClient({
  uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
})

passport.use(
  // @ts-ignore
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async (username, password, cb) => {
      try {
        const result = await apolloClient.query({
          query: gql`
            query findUserByUsername($username: String!) {
              users(where: { name: $username }) {
                id
                name
                password
              }
            }
          `,
          variables: {
            username,
          },
        })

        const user = result.data.users[0]

        if (!user) {
          cb(null, false, { message: 'Incorrect username.' })
          return
        }

        const validPassword = await isValidPassword(password, user.password)

        if (!validPassword) {
          cb(null, false, { message: 'Incorrect password.' })
          return
        }

        cb(null, user)
      } catch (error) {
        cb(error)
      }
    },
  ),
)

interface User {
  id: string
  name: string
}

passport.serializeUser((user: User, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await apolloClient.query({
      query: gql`
        query findUserById($id: ID!) {
          user(where: { id: $id }) {
            id
            name
          }
        }
      `,
      variables: {
        id,
      },
    })

    cb(null, result?.data?.user)
  } catch (error) {
    cb(error)
  }
})

export default passport
