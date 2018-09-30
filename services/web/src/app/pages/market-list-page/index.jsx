import React from 'react'
import { Query } from 'react-apollo'
import { css } from 'emotion'

import marketsQuery from '../../queries/markets'

import { Table } from './table'

const containerClassName = css``
const loaderClassName = css``
const errorClassName = css``

export const Component = () => (
  <div className={containerClassName}>
    <Query query={marketsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div className={loaderClassName}>
              <h1>Loading</h1>
            </div>
          )
        }

        if (error) {
          return (
            <div className={errorClassName}>
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
