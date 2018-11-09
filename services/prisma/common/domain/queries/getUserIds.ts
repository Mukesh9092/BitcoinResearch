import gql from 'graphql-tag'

export const getUserIds: string = gql`
  query {
    users {
      id
    }
  }
`
