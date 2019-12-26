import gql from 'graphql-tag'

export const createUserWithDashboard = gql`
  mutation createUserWithDashboard($name: String!, $password: String!) {
    createUser(data: { name: $name, password: $password, dashboard: { create: {} } }) {
      id
      name
      password
      dashboard {
        id
      }
    }
  }
`
