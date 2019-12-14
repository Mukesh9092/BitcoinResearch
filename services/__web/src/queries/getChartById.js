import gql from 'graphql-tag'

export const getChartById = gql`
  query getChartById($id: ID!) {
    getChartById(id: $id) {
      id
      from
      to
      period
      base
      quote
    }
  }
`
