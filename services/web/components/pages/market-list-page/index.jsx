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

export const Component = (props) => {
  const { classes } = props

  log.debug('before query')

  return (
    <Query query={marketsQuery}>
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

        const { markets } = data

        const filteredMarkets = markets.filter(({ active }) => {
          return active
        })

        const sortedMarkets = filteredMarkets.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          }

          if (a.id > b.id) {
            return 1
          }

          return 0
        })

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.titlePaper}>
                <h1 className={classes.pageTitle}>Markets</h1>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Table data={sortedMarkets} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Component)
