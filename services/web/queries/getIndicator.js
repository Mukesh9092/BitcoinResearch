import gql from 'graphql-tag'

export default gql`
  query getIndicator(
    $name: String!
    $key: String!
    $period: String!
    $from: Date!
    $to: Date!
  ) {
    getIndicator(
      name: $name
      key: $key
      period: $period
      from: $from
      to: $to
    ) {
      time
      open
      high
      low
      close
      volume
    }
  }
`
