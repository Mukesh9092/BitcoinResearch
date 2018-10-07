import gql from 'graphql-tag'

const query = gql`
  query {
    markets {
      id
    }
  }
`

export default query
