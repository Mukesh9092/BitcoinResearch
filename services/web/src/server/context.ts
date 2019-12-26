import { ContextFunction } from 'apollo-server-core'
import { resolve } from 'path'
import { Prisma } from 'prisma-binding'

const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_PORT)

const prismaClientOptions = {
  typeDefs: resolve(__dirname, 'datamodel.prisma.gen.graphql'),
  endpoint: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  debug: true,
}

const context: ContextFunction = (req) => {
  // const token = req?.headers?.authorization || ''

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
