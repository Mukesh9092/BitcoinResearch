import gql from 'graphql-tag'

export const getLineIndicator = gql`
  query getLineIndicator(
    $trader: String!
    $name: String!
    $base: String!
    $quote: String!
    $period: Period!
    $from: Date!
    $to: Date!
  ) {
    getLineIndicator(trader: $trader, name: $name, base: $base, quote: $quote, period: $period, from: $from, to: $to) {
      timestamp
      value
    }
  }
`
