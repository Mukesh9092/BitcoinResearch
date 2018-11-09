import gql from 'graphql-tag'

export const deleteManyUsers: string = gql`
  mutation deleteManyUsers {
    deleteManyUsers {
      count
    }
  }
`
