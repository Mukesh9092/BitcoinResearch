import gql from 'graphql-tag'

export const getChartsByUsername = gql`
  query getChartById($id: ID!) {
    chart(where:{
      id: $id
    }) {
      id
      from
      to
      period
      market {
        id
        active
        category
        type
        base
        maker
        precisionAmount
        precisionBase
        precisionPrice
        precisionQuote
        quote
        taker
        trader
      }
    }
  }
`
