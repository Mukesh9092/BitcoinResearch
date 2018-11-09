import gql from 'graphql-tag'

export const getMarketIds: string = gql`
  query {
    markets {
      id
    }
  }
`
