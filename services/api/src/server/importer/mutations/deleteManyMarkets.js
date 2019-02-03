import gql from 'graphql-tag'

export const deleteManyMarkets = gql`
  mutation deleteManyMarkets {
    deleteManyMarkets {
      count
    }
  }
`
