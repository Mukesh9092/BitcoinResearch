import gql from 'graphql-tag'

export const markets = gql`
  query markets {
    markets(
      where: {
        enabled: true
      }
    ) {
      id
      trader
      category
      type
      maker
      taker
      base
      quote
      precisionAmount
      precisionPrice
      precisionBase
      precisionQuote
    }
  }
`
