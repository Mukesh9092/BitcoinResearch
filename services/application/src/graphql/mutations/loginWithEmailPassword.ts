import { gql } from "react-apollo";

export default gql`
  mutation loginWithEmailPassword($email: String!, $password: String!) {
    loginWithEmailPassword(email: $email, password: $password) {
      id
      user {
        id
        email
      }
    }
  }
`;
