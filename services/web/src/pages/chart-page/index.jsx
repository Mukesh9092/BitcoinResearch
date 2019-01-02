import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import { Page } from '../../components/page'

import * as styles from './styles.scss'

@withRouter
@inject('applicationStore')
@inject('chartStore')
@observer
export class ChartPageComponent extends React.Component {
  componentWillMount() {
    const { applicationStore, chartStore } = this.props
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
