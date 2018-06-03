import React from 'react'
import Grid from 'material-ui/Grid'
// import Paper from 'material-ui/Paper'

import { log } from '../../../../../common/log'

import { OHLCChart } from './ohlc-chart'
import { OrderBook } from './order-book'

export default (props) => {
  const { key } = props.match.params

  log.debug({ key })

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <OHLCChart />
      </Grid>

      <Grid item xs={12}>
        <OrderBook marketKey={key} />
      </Grid>
    </Grid>
  )
}
