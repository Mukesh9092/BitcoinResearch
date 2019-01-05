import gql from 'graphql-tag'

import { getApolloClient } from '../common/apollo/client'
import { debug } from '../common/log'

export async function getPeriodValues() {
  const apolloClient = getApolloClient()

  const result = await apolloClient.query({
    query: gql`
      query {
        __type(name: "Period") {
          enumValues {
            name
          }
        }
      }
    `
  })

  const periodValues = result.data.__type.enumValues.map((x) => x.name)

  return periodValues
}
