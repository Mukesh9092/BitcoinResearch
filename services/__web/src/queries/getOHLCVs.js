import gql from 'graphql-tag'

export const getOHLCVs = gql`
  query getOHLCVs($base: String!, $quote: String!, $period: Period!, $from: DateTime!, $to: DateTime!) {
    getOHLCVs(base: $base, quote: $quote, period: $period, from: $from, to: $to) {
      datetime
      base
      quote
      period
      open
      high
      low
      close
      volume
    }
  }
`
