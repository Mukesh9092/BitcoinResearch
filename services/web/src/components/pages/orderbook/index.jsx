import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import { log } from '../../../../common/log'

import { orderBookQuery } from '../../../queries/orderBook'

import { Table } from './table'

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing.unit * 2,
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    pageTitle: {
      ...theme.typography.title,
    },
  }
}

export const OrderBookComponent = props => {
  const { classes, match: { params: { marketKey } } } = props

  return (
    <Query query={orderBookQuery} variables={{ marketKey }}>
      {({ loading, error, data }) => {
        if (loading) {
          return null
        }

        if (error) {
          return (
            <React.Fragment>
              <h1>Error</h1>
              <pre>{JSON.stringify(data.error)}</pre>
            </React.Fragment>
          )
        }

        const { orderBook } = data

        log.debug({ orderBook })

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1 className={classes.pageTitle}>Order Book</h1>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Table data={orderBook.bids} />
            </Grid>

            <Grid item xs={6}>
              <Table data={orderBook.asks} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export const OrderBook = withStyles(styles)(OrderBookComponent)

/*
const COMMENTS_SUBSCRIPTION = gql`
  subscription onCommentAdded($repoFullName: String!) {
    commentAdded(repoFullName: $repoFullName) {
      id
      content
    }
  }
`;

const DontReadTheComments = ({ repoFullName }) => (
  <Subscription
    subscription={COMMENTS_SUBSCRIPTION}
    variables={{ repoFullName }}
  >
    {({ data: { commentAdded }, loading }) => (
      <h4>New comment: {!loading && commentAdded.content}</h4>
    )}
  </Subscription>
);
        */
