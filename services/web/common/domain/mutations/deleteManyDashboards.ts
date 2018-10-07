import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteManyDashboards {
    deleteManyDashboards {
      count
    }
  }
`

export default mutation
