import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { Query } from 'react-apollo'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import { getMarkets } from '../../../queries/getMarkets'

import Page from '../../page'
import Table from './table'

import * as styles from './styles.scss'

@withRouter
@inject('store')
@observer
class MarketListPageComponent extends React.Component {
  render() {
    return (
      <Page>
        <Grid item xs={12}>
          <Query query={getMarkets}>
            {(marketsQueryProps) => {
              if (marketsQueryProps.loading) {
                return (
                  <div className={styles.loading}>
                    <CircularProgress />
                  </div>
                )
              }

              if (marketsQueryProps.error) {
                return (
                  <div className={styles.error}>
                    <h1>Error</h1>
                    <pre>{JSON.stringify(marketsQueryProps.error)}</pre>
                  </div>
                )
              }

              const { markets } = marketsQueryProps.data

              return <Table header="Markets" data={markets} />
            }}
          </Query>
        </Grid>
      </Page>
    )
  }
}

export const MarketListPage = MarketListPageComponent
