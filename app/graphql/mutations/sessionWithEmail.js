import { gql } from 'react-apollo'

export default gql`
  mutation sessionWithEmail($email: String!, $password: String!) {
    sessionWithEmail(email: $email, password: $password) {
      id
      user {
        id
        email
        username
      }
    }
  }
`
