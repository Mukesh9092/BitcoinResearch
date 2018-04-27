import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React from 'react';
import { History } from 'history';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
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
});

export const AboutComponent = (props) => {
  const { classes } = props;

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper className={classes.titlePaper}>
          <h1 className={classes.pageTitle}>About</h1>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.titlePaper}>
          <p className={classes.body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
            sollicitudin orci. Ut aliquet ante et metus ultrices tincidunt.
            Aliquam venenatis maximus aliquam. Aliquam nulla elit, scelerisque
            eget dapibus a, porta vel dui. In pellentesque nunc ac quam rutrum,
            non dapibus urna scelerisque. Nam blandit lobortis metus eget
            gravida. Nulla eget urna sed diam commodo iaculis. Duis porta tortor
            placerat urna scelerisque pulvinar. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Phasellus et
            consequat dolor. Curabitur blandit vitae augue vitae pulvinar.
            Praesent mollis nibh ante, id efficitur purus iaculis a. Mauris
            iaculis, eros ut finibus consequat, tellus risus tincidunt sapien, a
            aliquet quam nunc nec leo. Proin iaculis sit amet ex a fermentum.
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export const About = withStyles(styles)(AboutComponent);
