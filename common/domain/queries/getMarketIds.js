import gql from 'graphql-tag'

export const getMarketIds = gql`
  query {
    markets {
      id
    }
  }
`
