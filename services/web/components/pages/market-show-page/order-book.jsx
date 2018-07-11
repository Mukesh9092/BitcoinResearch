import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Grid from 'material-ui/Grid'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Paper from 'material-ui/Paper'
import { LinearProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import { log } from '../../.././common/log'

import orderBookQuery from '../../../queries/orderBook'

import { OrderBookTable } from './order-book-table'

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

export const OrderBookComponent = (props) => {
  // Had to call it marketKey here because key is protected
  const { classes, marketKey } = props

  return (
    <Query query={orderBookQuery} variables={{ key: marketKey }}>
      {({ loading, error, data }) => {
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

        const { orderBook } = data

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.titlePaper}>
                <Link to="/">
                  <KeyboardArrowLeft />
                </Link>
                <h1 className={classes.pageTitle}>Order Book</h1>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <OrderBookTable data={orderBook.bids.slice(0, 10)} />
            </Grid>

            <Grid item xs={6}>
              <OrderBookTable data={orderBook.asks.slice(0, 10)} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export const OrderBook = withStyles(styles)(OrderBookComponent)
