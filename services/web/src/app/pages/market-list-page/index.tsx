import * as React from 'react'
import { Query } from 'react-apollo'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import { markets } from '../../../../common/domain/queries/markets'
import { IMarket } from '../../../../../../common/domain/types/IMarket'

import { Table } from './table'

import * as styles from './styles.scss'

interface IMarketsQueryProps {
  loading: boolean
  error: null | Error
  data: {
    markets: [IMarket];
  }
}

interface IMarketListPageComponentProps {
  classes: {
    root: string;
    paper: string;
  }
}

export const MarketListPageComponent = (props: IMarketListPageComponentProps) => (
  <div className={styles.page}>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Query query={markets}>
          {(marketsQueryProps: IMarketsQueryProps) => {
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

            const markets = marketsQueryProps.data.markets

            return (
              <Table header='Markets' data={markets} />
            )
          }}
        </Query>
      </Grid>
    </Grid>
  </div>
)

export const MarketListPage = MarketListPageComponent
