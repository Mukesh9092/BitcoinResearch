import React from 'react'
import Grid from 'material-ui/Grid'

import { log } from '../../.././common/log'

import { OHLCChart } from './ohlc-chart'
import { OrderBook } from './order-book'

export default (props) => {
  const { key } = props.match.params

  // TODO Make interactive
  const period = '1h'
  const to = new Date()
  const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000)

  const fromDate = from.toISOString()
  const toDate = to.toISOString()

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <OHLCChart
          marketKey={key}
          period={period}
          from={fromDate}
          to={toDate}
        />
      </Grid>
    </Grid>
  )
}
