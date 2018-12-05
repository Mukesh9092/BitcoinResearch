import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { AddChart } from './add-chart'
import { ChartList } from './chart-list'
import { Toolbar } from './toolbar'

import * as styles from './styles.scss'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class DashboardPageComponent extends React.Component {
  state = {
    showAddChart: false,
  }

  componentWillMount() {
    const { applicationStore, dashboardStore } = this.props

    dashboardStore.getDashboard({
      userId: applicationStore.user.id,
    })
    dashboardStore.getMarkets()
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
      <div className={styles.page}>
        <Toolbar onAddClick={this.handleToolbarAddClick} />
        {showAddChart && <AddChart onCancel={this.handleAddChartCancel} onComplete={this.handleAddChartComplete} />}
        <ChartList />
      </div>
    )
  }
}

export const DashboardPage = DashboardPageComponent
