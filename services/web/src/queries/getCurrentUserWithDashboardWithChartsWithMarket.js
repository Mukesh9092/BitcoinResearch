import gql from 'graphql-tag'

export const getCurrentUserWithDashboardWithChartsWithMarket = gql`
  query getUserWithDashboardWithChartsWithMarket {
    getCurrentUser {
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
