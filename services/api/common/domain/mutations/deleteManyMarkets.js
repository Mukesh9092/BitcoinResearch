import gql from 'graphql-tag'

export const deleteManyMarkets = gql`
  mutation deleteManyUsers {
    deleteManyMarkets {
      count
    }
  }
`
