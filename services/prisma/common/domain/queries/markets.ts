import gql from 'graphql-tag'

export const markets: string = gql`
  query markets {
    markets {
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
