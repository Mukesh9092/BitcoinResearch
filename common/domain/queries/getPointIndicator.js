import gql from 'graphql-tag'

export const getPointIndicator = gql`
  query getPointIndicator(
    $trader: String!
    $name: String!
    $base: String!
    $quote: String!
    $period: Period!
    $from: Date!
    $to: Date!
  ) {
    getPointIndicator(trader: $trader, name: $name, base: $base, quote: $quote, period: $period, from: $from, to: $to) {
      timestamp
      value
    }
  }
`
