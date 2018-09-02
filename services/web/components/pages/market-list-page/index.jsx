import React from 'react'
import { Query } from 'react-apollo'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { LinearProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import { log } from '../../.././common/log'

import marketsQuery from '../../../queries/markets'

import { Table } from './table'

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    titlePaper: {
      marginTop: theme.spacing.unit * 2,
      padding: theme.spacing.unit,
      color: theme.palette.text.secondary,
    },
    pageTitle: {
      ...theme.typography.title,
      textAlign: 'center',
    },
    body: {
      ...theme.typography.body1,
    },
  }
}

function sortMarkets(markets) {
  return markets
    .map((m) => {
      return {
        ...m,
        id: `${m.base}_${m.quote}`,
      }
    })
    .sort((a, b) => {
      if (a.id < b.id) {
        return -1
      }

      if (a.id > b.id) {
        return 1
      }

      return 0
    })
}

export const Component = (props) => {
  const { classes } = props

  log.debug('before query')

  return (
    <Query query={marketsQuery}>
      {({ loading, error, data }) => {
        log.debug('after query', loading, error, data)

        if (loading) {
          return (
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Paper className={classes.titlePaper}>
                  <LinearProgress />
                </Paper>
              </Grid>
            </Grid>
          )
        }

        if (error) {
          return (
            <React.Fragment>
              <h1>Error</h1>
              <pre>{JSON.stringify(error)}</pre>
            </React.Fragment>
          )
        }

        const binanceMarkets = data.markets.filter((market) => {
          return market.trader === 'binance'
        })

        const onebrokerMarkets = data.markets.filter((market) => {
          return market.trader === 'onebroker'
        })

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.titlePaper}>
                <h1 className={classes.pageTitle}>Markets</h1>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Table header="Binance" data={sortMarkets(binanceMarkets)} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Component)
