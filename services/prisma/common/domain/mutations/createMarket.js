import gql from 'graphql-tag'

export const createMarket = gql`
  mutation createMarket(
    $active: Boolean!
    $trader: String!
    $category: String!
    $type: String!
    $base: String!
    $quote: String!
    $maker: String!
    $taker: String!
    $precisionAmount: Int!
    $precisionBase: Int!
    $precisionPrice: Int!
    $precisionQuote: Int!
  ) {
    createMarket(
      data: {
        active: $active
        trader: $trader
        category: $category
        type: $type
        base: $base
        quote: $quote
        maker: $maker
        taker: $taker
        precisionAmount: $precisionAmount
        precisionBase: $precisionBase
        precisionPrice: $precisionPrice
        precisionQuote: $precisionQuote
      }
    ) {
      id
    }
  }
`
