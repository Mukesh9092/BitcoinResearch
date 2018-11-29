import gql from 'graphql-tag'

export const orderBook = gql`
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
