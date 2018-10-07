import gql from 'graphql-tag'

const query = gql`
  query {
    users {
      id
      dashboard {
        id
      }
    }
  }
`

export default query
