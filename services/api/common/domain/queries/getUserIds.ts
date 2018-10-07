import gql from 'graphql-tag'

const query = gql`
  query {
    users {
      id
    }
  }
`

export default query
