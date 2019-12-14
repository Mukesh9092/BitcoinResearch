import gql from 'graphql-tag'

export const getCurrentUserWithDashboardWithCharts = gql`
  query getCurrentUserWithDashboardWithCharts {
    getCurrentUser {
      id
      name
      dashboard {
        id
        charts {
          id
          from
          to
          period
          base
          quote
        }
      }
    }
  }
`
