import gql from 'graphql-tag'

export const deleteChart: string = gql`
  mutation deleteChart($id: ID!) {
    deleteChart(where: {
      id: $id
    }) {
      id
    }
  }
`
