import gql from 'graphql-tag'

export default gql`
  query getOHLC($key: String!, $period: String!, $from: Date!, $to: Date!) {
    getOHLC(key: $key, period: $period, from: $from, to: $to) {
      time
      open
      high
      low
      close
      volume
    }
  }
`
