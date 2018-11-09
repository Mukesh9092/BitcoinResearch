import gql from 'graphql-tag'

export const getChartsByUsername: string = gql`
  query {
    users {
      id
    }
  }
`
