import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import AddChart from './add-chart'
import ChartList from './chart-list'
import Toolbar from './toolbar'

import Page from '../../page'

@withRouter
@inject('store')
@observer
class DashboardPageComponent extends React.Component {
  state = {
    showAddChart: false,
  }

  componentDidMount() {
    const {
      store,
      store: { dashboardStore },
    } = this.props

    dashboardStore.fetchMarkets()
    dashboardStore.fetch({
      userId: store.user.id,
    })
  }

  handleToolbarAddClick = () => {
    this.setState({
      showAddChart: true,
    })
  }

  handleAddChartCancel = () => {
    this.setState({
      showAddChart: false,
    })
  }

  handleAddChartComplete = () => {
    this.setState({
      showAddChart: false,
    })
  }

  render() {
    const { showAddChart } = this.state

    return (
      <Page>
        <Grid item xs={12}>
          <Toolbar onAddClick={this.handleToolbarAddClick} />
          {showAddChart && <AddChart onCancel={this.handleAddChartCancel} onComplete={this.handleAddChartComplete} />}
          <ChartList />
        </Grid>
      </Page>
    )
  }
}

export const DashboardPage = DashboardPageComponent
