import gql from 'graphql-tag'

export default gql`
  query orderBook($key: String!) {
    orderBook(key: $key) {
      bids {
        rate
        amount
      }
      asks {
        rate
        amount
      }
    }
  }
`
