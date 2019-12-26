import { ContextFunction } from 'apollo-server-core'
import { Prisma } from 'prisma-binding'

const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_PORT)

const prismaClientOptions = {
  typeDefs: 'src/datamodel.prisma.gen.graphql',
  endpoint: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  debug: true,
}

const context: ContextFunction = (req) => {
  const token = req.headers.authorization || ''

  // Get user from
  // const user = getUserByToken(token)
  // if (!user) {
  //   throw new AuthenticationError('you must be logged in')
  // }

  return {
    // authentication: {
    //   user,
    // },
    prisma: new Prisma(prismaClientOptions),
  }
}

export default context
