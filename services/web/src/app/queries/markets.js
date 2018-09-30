import gql from 'graphql-tag'

export default gql`
  query markets {
    markets {
      id
      trader
      base
      quote
      category
      type
    }
  }
`
