import gql from 'graphql-tag'

export const getChartsByUsername = gql`
  query {
    users {
      id
    }
  }
`
