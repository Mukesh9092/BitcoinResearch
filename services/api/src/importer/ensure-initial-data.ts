import { getApolloClient } from '../common/apollo/client'
import { generateHash } from '../common/password'
import { createUserWithDashboard } from './mutations/createUserWithDashboard'
import { getUserIds } from './queries/getUserIds'

const PRISMA_HOST = String(process.env.PRISMA_HOST)
const PRISMA_PORT = Number(process.env.PRISMA_PORT)

export async function ensureInitialData() {
  // console.log('ensureInitialData')

  const apolloClient = getApolloClient({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  })

  const usersResult = await apolloClient.query({ query: getUserIds })
  const usersExist = usersResult?.data?.users?.length > 0

  if (usersExist) {
    // console.log('ensureInitialData users exist, removing charts')
    // await apolloClient.mutate({ mutation: deleteManyCharts })
    // console.log('ensureInitialData charts removed')
  } else {
    // console.log('ensureInitialData creating new users')

    const passwordHash = await generateHash('test')

    const createUserWithDashboardResult = await apolloClient.mutate({
      mutation: createUserWithDashboard,
      variables: {
        name: 'admin',
        password: passwordHash,
      },
    })

    // console.log('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult)
  }

  // console.log('ensureInitialData done')
}
