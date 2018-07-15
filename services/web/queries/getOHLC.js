import gql from 'graphql-tag'

export default gql`
  query getOHLC($key: String!, $period: String!, $from: Int!, $to: Int!) {
    getOHLC(key: $key, period: $period, from: $from, to: $to) {
      date
      open
      high
      low
      close
      volume
    }
  }
`
