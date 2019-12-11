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
  return {
    ...req,
    prisma: new Prisma(prismaClientOptions),
  }
}

export default context
