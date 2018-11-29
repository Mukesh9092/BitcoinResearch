import gql from 'graphql-tag'

export const createOHLCV = gql`
  mutation createOHLCV(
    $marketBase: String!
    $marketQuote: String!
    $timestamp: DateTime!
    $period: String!
    $open: Float!
    $high: Float!
    $low: Float!
    $close: Float!
    $volume: Float!
  ) {
    createOHLCV(
      data: {
        marketBase: $marketBase
        marketQuote: $marketQuote
        period: $period
        timestamp: $timestamp
        open: $open
        high: $high
        low: $low
        close: $close
        volume: $volume
      }
    ) {
      id
    }
  }
`
