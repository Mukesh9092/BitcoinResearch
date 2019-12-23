import gql from 'graphql-tag'
import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import { getApolloClient } from '../common/apollo/client'

const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_HOST)

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
              }
            }
          `,
          variables: {
            username,
          },
        })

        console.log('LocalStrategy:result', result)

        cb(null, false)
      } catch (error) {
        cb(error)
      }

      // User.findOne({ username: username }, function(err, user) {
      //   if (err) {
      //     return cb(err)
      //   }
      //   if (!user) {
      //     return cb(null, false, { message: 'Incorrect username.' })
      //   }
      //   if (!user.validPassword(password)) {
      //     return cb(null, false, { message: 'Incorrect password.' })
      //   }
      //   return cb(null, user)
      // })
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
        query findUserById($id: String!) {
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

    console.log('deserializeUser:result', result)

    cb(null)
  } catch (error) {
    cb(error)
  }

  // User.findById(id, function(err, user) {
  //   cb(err, user)
  // })
})

export const createPassportApplication = async () => {}
