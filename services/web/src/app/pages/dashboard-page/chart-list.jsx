import * as React from 'react'
import { inject, observer } from 'mobx-react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import * as styles from './styles.scss'
import { ChartCard } from './chart-card'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class ChartListComponent extends React.Component {
  renderLoading = () => (
    <div className={styles.charts}>
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    </div>
  )

  renderError = () => (
    <div className={`${styles.charts} ${styles.chartsLoading}`}>
      <Paper className={styles.chart}>
        <div className={styles.error}>
          <h1>Error</h1>
          <pre>{JSON.stringify(this.props.dashboardStore.dashboardQuery.error)}</pre>
        </div>
      </Paper>
    </div>
  )

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
            return (
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <ChartCard chart={chart} key={i} userId={applicationStore.user.id} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export const ChartList = ChartListComponent
