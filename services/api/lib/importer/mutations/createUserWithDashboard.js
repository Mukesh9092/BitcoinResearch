import gql from 'graphql-tag';
export const createUserWithDashboard = gql `
  mutation createUserWithDashboard($name: String!) {
    createUser(data: { name: $name, dashboard: { create: {} } }) {
      id
      name
      dashboard {
        id
      }
    }
  }
`;
