import * as React from 'react'
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import * as styles from './styles.scss'

const materialUIStyles = () => {
  return {
    root: {
      flexGrow: 1,
    },
  }
}

export const AboutPageComponent = (props) => {
  return (
    <div className={styles.page}>
      <div className={props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <h1>Bitcoin Platform</h1>

              <p>
                Hi! This app will become my automated coin and shares trading platform. I've got a lot of features
                planned. For now there is the <Link to="/markets">Markets Page</Link> and the <Link to="/dashboard">Dashboard Page</Link>.
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export const AboutPage = withStyles(materialUIStyles)(AboutPageComponent)
