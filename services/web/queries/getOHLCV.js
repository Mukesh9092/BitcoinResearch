import gql from 'graphql-tag'

export default gql`
  query getOHLCV($key: String!, $period: String!, $from: Date!, $to: Date!) {
    getOHLCV(key: $key, period: $period, from: $from, to: $to) {
      time
      open
      high
      low
      close
      volume
    }
  }
`
