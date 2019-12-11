import gql from 'graphql-tag';
export const getUserIds = gql `
  query {
    users {
      id
    }
  }
`;
