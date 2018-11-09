import gql from 'graphql-tag'

export const deleteManyMarkets: string = gql`
  mutation deleteManyUsers {
    deleteManyMarkets {
      count
    }
  }
`
