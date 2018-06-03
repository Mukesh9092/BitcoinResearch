import React from 'react'
import { Query } from 'react-apollo'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { LinearProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import { log } from '../../../../../common/log'

import currencyPairsQuery from '../../../queries/currencyPairs'

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

export const Component = (props) => {
  const { classes } = props

  log.debug('before query')

  return (
    <Query query={currencyPairsQuery}>
      {({ loading, error, data }) => {
        log.debug('after query')
        log.debug(loading)
        log.debug(error)
        log.debug(data)

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

        const { currencyPairs } = data

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.titlePaper}>
                <h1 className={classes.pageTitle}>Currency Pairs</h1>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Table data={currencyPairs} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Component)
