import gql from 'graphql-tag'

export const getMarkets = gql`
  query getMarkets {
    getMarkets {
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
