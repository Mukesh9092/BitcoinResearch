import React from 'react'
import { Query } from 'react-apollo'

import marketsQuery from '../../queries/markets'

import * as styles from './index.scss'
import { Table } from './table'

export const Component = () => (
  <div className={styles.marketListPage}>
    <Query query={marketsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div className={styles.loader}>
              <h1>Loading</h1>
            </div>
          )
        }

        if (error) {
          return (
            <div className={styles.error}>
              <h1>Error</h1>
              <pre>{JSON.stringify(error)}</pre>
            </div>
          )
        }

        return (
          <React.Fragment>
            <h1>Markets</h1>
            <Table header="OneBroker" data={data.markets} />
          </React.Fragment>
        )
      }}
    </Query>
  </div>
)

export default Component
