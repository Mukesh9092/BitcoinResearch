import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { currencyPairsQuery } from '../../../queries/currencyPairs';

import { Table } from './table';

const styles = theme => ({
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
});

export const HomeComponent = (props) => {
  const { classes } = props;

  return (
    <Query query={currencyPairsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return (
            <React.Fragment>
              <h1>Error</h1>
              <pre>{JSON.stringify(data.error)}</pre>
            </React.Fragment>
          );
        }

        const { currencyPairs } = data;

        return (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1 className={classes.pageTitle}>Currency Pairs</h1>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Table data={currencyPairs} />
            </Grid>
          </Grid>
        );
      }}
    </Query>
  );
};

export const Home = withStyles(styles)(HomeComponent);
