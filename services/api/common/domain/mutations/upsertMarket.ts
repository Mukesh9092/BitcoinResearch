import gql from 'graphql-tag'

export const upsertMarket: string = gql`
  mutation upsertMarket(
    $id: ID
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
    $active: Boolean!
  ) {
    upsertMarket(
      where: { id: $id }
      create: {
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
        active: $active
      }
      update: {
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
        active: $active
      }
    ) {
      id
    }
  }
`
