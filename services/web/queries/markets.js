import gql from 'graphql-tag'

export default gql`
  query markets {
    markets {
      base
      quote
      trader
      category
      type
    }
  }
`
