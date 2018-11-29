import gql from 'graphql-tag'

export const deleteManyUsersByIds = gql`
  mutation deleteManyUsersByIds($ids: [ID!]) {
    deleteManyUsers(where: { id_in: $ids }) {
      count
    }
  }
`
