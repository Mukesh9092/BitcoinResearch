import gql from 'graphql-tag'

export const createChart = gql`
  mutation createChart($dashboardId: ID!, $marketId: ID!, $from: DateTime!, $to: DateTime!, $period: Period!) {
    createChart(data: {
      dashboard: {
        connect: {
          id: $dashboardId
        }
      },
      market: {
        connect: {
          id: $marketId
        }
      },
      from: $from,
      to: $to,
      period: $period
    }) {
      id
      from
      to
      period
      dashboard {
        id
      }
      market {
        id
        active
        trader
        category
        type
        base
        quote
        precisionAmount
        precisionBase
        precisionPrice
        precisionQuote
        taker
        maker
      }
    }
  }
`
