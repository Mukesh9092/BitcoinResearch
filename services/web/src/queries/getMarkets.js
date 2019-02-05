import gql from 'graphql-tag'

export const getMarkets = gql`
  query getMarkets {
    getMarkets {
      base
      quote
    }
  }
`
