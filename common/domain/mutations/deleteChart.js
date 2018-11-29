import gql from 'graphql-tag'

export const deleteChart = gql`
  mutation deleteChart($id: ID!) {
    deleteChart(where: { id: $id }) {
      id
    }
  }
`
