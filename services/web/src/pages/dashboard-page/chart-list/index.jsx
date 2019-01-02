import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { inject, observer } from 'mobx-react'

import { ChartCard } from '../chart-card'

import * as styles from './styles.scss'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class ChartListComponent extends React.Component {
  renderLoading = () => {
    return (
      <div className={styles.charts}>
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      </div>
    )
  }

  renderError = () => {
    const { dashboardStore } = this.props

    return (
      <div className={`${styles.charts} ${styles.chartsLoading}`}>
        <Paper className={styles.chart}>
          <div className={styles.error}>
            <h1>Error</h1>
            <pre>{JSON.stringify(dashboardStore.dashboardQuery.error)}</pre>
          </div>
        </Paper>
      </div>
    )
  }

  render() {
    const { applicationStore, dashboardStore } = this.props

    if (dashboardStore.dashboardQuery.state === 'initial') {
      return this.renderLoading()
    }

    if (dashboardStore.dashboardQuery.state === 'pending') {
      return this.renderLoading()
    }

    if (dashboardStore.dashboardQuery.state === 'error') {
      return this.renderError()
    }

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
                <ChartCard chart={chart} userId={applicationStore.user.id} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export const ChartList = ChartListComponent
