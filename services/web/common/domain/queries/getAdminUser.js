import gql from 'graphql-tag'

export const getAdminUser = gql`
  query {
    users(where: { name: "admin" }) {
      id
      name
    }
  }
`
