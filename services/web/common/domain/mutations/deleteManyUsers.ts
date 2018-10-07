import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteManyUsers {
    deleteManyUsers {
      count
    }
  }
`

export default mutation
