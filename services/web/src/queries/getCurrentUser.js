import gql from 'graphql-tag'

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      name
    }
  }
`
