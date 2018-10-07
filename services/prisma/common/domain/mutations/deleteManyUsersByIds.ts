import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteManyUsersByIds($ids: [ID!]) {
    deleteManyUsers(where: { id_in: $ids }) {
      count
    }
  }
`

export default mutation
