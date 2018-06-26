import gql from 'graphql-tag'

export default gql`
  query markets {
    markets {
      id
      active
      base
      quote
    }
  }
`
