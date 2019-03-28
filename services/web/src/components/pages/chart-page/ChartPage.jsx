import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import Page from '../../page/index'

import * as styles from './styles.scss'

@withRouter
@inject('store')
@observer
class ChartPageComponent extends React.Component {
  componentWillMount() {
    const { store } = this.props
  }

  render() {
    return (
      <Page>
        <Grid item xs={12}>
          <h1>EHRMAGERHDZ</h1>
        </Grid>
      </Page>
    )
  }
}

export const ChartPage = ChartPageComponent
