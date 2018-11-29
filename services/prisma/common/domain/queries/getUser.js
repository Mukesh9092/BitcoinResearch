import gql from 'graphql-tag'

export const getUser = gql`
  query getUser($userId: ID!) {
    user(where: { id: $userId }) {
      id
      name
    }
  }
`
