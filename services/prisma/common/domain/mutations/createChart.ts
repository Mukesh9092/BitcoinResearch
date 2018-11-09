import gql from 'graphql-tag'

export const createChart: string = gql`
  mutation createChart($dashboardId: ID!, $marketId: ID!) {
    createChart(data: { dashboard: { connect: { id: $dashboardId } }, market: { connect: { id: $marketId } } }) {
      id
      market {
        id
        active
        category
        type
        base
        quote
      }
    }
  }
`
