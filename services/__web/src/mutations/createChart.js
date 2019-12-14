import gql from 'graphql-tag'

export const createChart = gql`
  mutation createChart(
    $dashboardId: ID!
    $base: String!
    $quote: String!
    $from: DateTime!
    $to: DateTime!
    $period: Period!
  ) {
    createChart(dashboardId: $dashboardId, base: $base, quote: $quote, from: $from, to: $to, period: $period) {
      id
      from
      to
      period
      dashboard {
        id
      }
      base
      quote
    }
  }
`
