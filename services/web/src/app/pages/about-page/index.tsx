import * as React from 'react'

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

interface IAboutPageComponentProps {
  classes: {
    root: string;
  }
}

export const AboutPageComponent = (props: IAboutPageComponentProps) => {
  return (
    <div className={styles.page}>
      <div className={props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export const AboutPage = withStyles(materialUIStyles)(AboutPageComponent)
