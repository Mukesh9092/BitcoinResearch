import gql from 'graphql-tag'

const mutation = gql`
  mutation createUserWithDashboard($name: String!) {
    createUser(data: { name: $name, dashboard: { create: {} } }) {
      id
      name
      dashboard {
        id
      }
    }
  }
`

export default mutation