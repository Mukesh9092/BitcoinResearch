import gql from 'graphql-tag'

export default gql`
  query getOHLC($key: String!, $scale: String!, $from: Int!, $to: Int!) {
    getOHLC(key: $key, scale: $scale, from: $from, to: $to) {
      date: Int!
      open: Float!
      high: Float!
      low: Float!
      close: Float!
      volume: Float!
      quoteVolume: Float!
      weightedAverage: Float!
    }
  }
`
