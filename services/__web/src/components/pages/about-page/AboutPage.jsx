import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Page from '../../page/index'

import * as styles from './styles.scss'

@withRouter
@inject('store')
@observer
class AboutPageComponent extends React.Component {
  render() {
    return (
      <Page>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <h1>Bitcoin Platform</h1>

            <p>
              Hi! This app will become my automated coin and shares trading platform. I've got a lot of features
              planned. For now there is the <Link to="/markets">Markets Page</Link> and the <Link to="/dashboard">Dashboard Page</Link>.
            </p>
          </Paper>
        </Grid>
      </Page>
    )
  }
}

export const AboutPage = AboutPageComponent
