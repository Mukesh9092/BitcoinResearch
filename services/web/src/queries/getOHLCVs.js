import gql from 'graphql-tag'

export const getOHLCVs = gql`
  query getOHLCVs($marketBase: String!, $marketQuote: String!, $period: Period!, $from: DateTime!, $to: DateTime!) {
    getOHLCVs(base: $marketBase, quote: $marketQuote, period: $period, from: $from, to: $to) {
      datetime
      marketBase
      marketQuote
      period
      open
      high
      low
      close
      volume
    }
  }
`
