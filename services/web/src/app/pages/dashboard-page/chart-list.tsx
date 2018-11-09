import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import { IApolloQueryResult } from '../../../../common/apollo/types/IApolloQueryResult'
import { IChart } from '../../../../common/domain/types/IChart'
import { IMarket } from '../../../../common/domain/types/IMarket'
import { IUser } from '../../../../common/domain/types/IUser'

import * as styles from './styles.scss'
import { ChartCard } from './chart-card'

interface IChartListProps {
  userId: string
  getUserWithDashboardArguments: IApolloQueryResult<IUser>
}

export const ChartList = (props: IChartListProps) => {
  if (props.getUserWithDashboardArguments.loading) {
    return (
      <div className={styles.charts}>
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      </div>
    )
  }

  if (props.getUserWithDashboardArguments.errors && props.getUserWithDashboardArguments.errors.length) {
    return (
      <div className={`${styles.charts} ${styles.chartsLoading}`}>
        <Paper className={styles.chart}>
          <div className={styles.error}>
            <h1>Error</h1>
            <pre>{JSON.stringify(props.getUserWithDashboardArguments.errors)}</pre>
          </div>
        </Paper>
      </div>
    )
  }

  const data = props.getUserWithDashboardArguments.data.user.dashboard.charts

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
      {data.map((chart: IChart, i: number) => (
        <ChartCard chart={chart} key={i} userId={props.userId} />
      ))}
    </div>
  )
}
