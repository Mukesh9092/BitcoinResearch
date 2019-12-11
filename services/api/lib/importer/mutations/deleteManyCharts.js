import gql from 'graphql-tag';
export const deleteManyCharts = gql `
  mutation {
    deleteManyCharts(where: {}) {
      count
    }
  }
`;
