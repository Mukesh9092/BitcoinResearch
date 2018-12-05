import gql from 'graphql-tag'

export const oHLCVs = gql`
  query oHLCVs($marketBase: String!, $marketQuote: String!, $period: String!, $from: DateTime!, $to: DateTime!) {
    oHLCVs(
      where: {
        marketBase: $marketBase
        marketQuote: $marketQuote
        period: $period
        timestamp_gte: $from
        timestamp_lte: $to
      }
    ) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`
