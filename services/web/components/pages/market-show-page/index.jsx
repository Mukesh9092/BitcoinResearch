import React from 'react'
import Grid from 'material-ui/Grid'

import { log } from '../../.././common/log'

import { OHLCChart } from './ohlc-chart'
import { OrderBook } from './order-book'

export default (props) => {
  const { key } = props.match.params

  log.debug({ key })

  /*
      <Grid item xs={12}>
        <OHLCChart />
      </Grid>
  */

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <OrderBook marketKey={key} />
      </Grid>
    </Grid>
  )
}
