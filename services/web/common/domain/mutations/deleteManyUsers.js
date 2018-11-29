import gql from 'graphql-tag'

export const deleteManyUsers = gql`
  mutation deleteManyUsers {
    deleteManyUsers {
      count
    }
  }
`
