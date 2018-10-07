import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteManyUsers {
    deleteManyMarkets {
      count
    }
  }
`

export default mutation
