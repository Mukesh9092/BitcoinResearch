import gql from 'graphql-tag'

export default gql`
  query getOHLCV($trader: String!, $base: String!, $quote: String!, $period: String!, $from: Date!, $to: Date!) {
    getOHLCV(trader: $trader, base: $base, quote: $quote, period: $period, from: $from, to: $to) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`
