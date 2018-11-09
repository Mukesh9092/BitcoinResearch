import gql from 'graphql-tag'

export const deleteManyUsersByIds: string = gql`
  mutation deleteManyUsersByIds($ids: [ID!]) {
    deleteManyUsers(where: { id_in: $ids }) {
      count
    }
  }
`
