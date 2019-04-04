import gql from 'graphql-tag'

export const deleteChart = gql`
  mutation deleteChart($chartId: ID!) {
    deleteChart(chartId: $chartId)
  }
`
