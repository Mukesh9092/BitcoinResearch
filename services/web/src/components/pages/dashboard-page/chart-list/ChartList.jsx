import * as React from 'react'
import { inject, observer } from 'mobx-react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ChartCard from '../chart-card'
import { AsyncComponent } from '../../../async-component'

import * as styles from './styles.scss'

@inject('store')
@observer
class ChartListComponent extends AsyncComponent {
  constructor(props) {
    super(props)

    this.query = props.store.dashboardStore.fetch
  }

  renderPending() {
    return (
      <div className={styles.charts}>
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      </div>
    )
  }

  renderRejected(error) {
    return (
      <div className={`${styles.charts} ${styles.chartsLoading}`}>
        <Paper className={styles.chart}>
          <div className={styles.error}>
            <h1>Error</h1>
            <pre>{JSON.stringify(error)}</pre>
          </div>
        </Paper>
      </div>
    )
  }

  renderResolved() {
    const {
      props: {
        store,
        store: { dashboardStore },
      },
    } = this

    const data = dashboardStore.charts

    if (!data || !data.length) {
      return (
        <div className={styles.charts}>
          <div className={styles.empty}>
            <p>No charts. Click on the Add Chart button to add one.</p>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.charts}>
        <Grid container spacing={24}>
          {data.map((chart, i) => {
            let xs = 12
            let md = 6
            let lg = 4
            let xl = 2

            if (data.length === 1) {
              xs = 12
              md = 12
              lg = 12
              xl = 12
            }

            if (data.length === 2) {
              xs = 12
              md = 6
              lg = 6
              xl = 6
            }

            if (data.length === 3) {
              xs = 12
              md = 6
              lg = 4
              xl = 4
            }

            if (data.length >= 4) {
              xs = 12
              md = 6
              lg = 4
              xl = 2
            }

            return (
              <Grid item xs={xs} md={md} lg={lg} xl={xl} key={i}>
                <ChartCard chart={chart} userId={store.user.id} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export const ChartList = ChartListComponent
