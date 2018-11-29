import * as React from 'react'
import { inject, observer } from 'mobx-react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import * as styles from './styles.scss'
import { ChartCard } from './chart-card'

export const ChartListComponent = (props) => {
  const { applicationStore } = props

  if (applicationStore.userState === 'pending') {
    return (
      <div className={styles.charts}>
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      </div>
    )
  }

  if (applicationStore.userState === 'error') {
    return (
      <div className={`${styles.charts} ${styles.chartsLoading}`}>
        <Paper className={styles.chart}>
          <div className={styles.error}>
            <h1>Error</h1>
            <pre>{JSON.stringify(applicationStore.userError)}</pre>
          </div>
        </Paper>
      </div>
    )
  }

  const data = applicationStore.user.dashboard.charts

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
      {data.map((chart, i) => (
        <ChartCard chart={chart} key={i} userId={props.userId} />
      ))}
    </div>
  )
}

export const ChartList = inject('applicationStore')(observer(ChartListComponent))
