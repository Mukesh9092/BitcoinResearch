import gql from 'graphql-tag'

export const deleteManyOHLCVs = gql`
  mutation deleteManyOHLCVs(
    $marketBase: String!
    $marketQuote: String!
    $period: Period!
    $from: DateTime!
    $to: DateTime!
  ) {
    deleteManyOHLCVs(
      where: {
        marketBase: $marketBase
        marketQuote: $marketQuote
        period: $period
        timestamp_gte: $from
        timestamp_lte: $to
      }
    ) {
      count
    }
  }
`
