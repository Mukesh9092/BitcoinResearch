import gql from 'graphql-tag'

export const getUserWithDashboardWithChartsWithMarketByUserId = gql`
  query getUserWithDashboardWithChartsWithMarket($userId: ID!) {
    user(where: { id: $userId }) {
      id
      name
      dashboard {
        id
        charts {
          id
          from
          to
          period
          market {
            id
            trader
            active
            category
            type
            base
            quote
            maker
            taker
            precisionBase
            precisionQuote
            precisionAmount
            precisionPrice
          }
        }
      }
    }
  }
`
