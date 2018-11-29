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

    dashboardStore.dashboardQuery.query({
      variables: {
        userId: applicationStore.userQuery.result.id,
      },
    })
    dashboardStore.marketsQuery.query()
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

  render() {
    const { showAddChart } = this.state

    if (!this.props.applicationStore.user) {
      return null
    }

    return (
      <div className={styles.page}>
        <Toolbar onAddClick={this.handleToolbarAddClick} />
        {showAddChart && (
          <AddChart onCancel={this.handleAddChartCancel} />
        )}
        <ChartList userId={this.props.userId} />
      </div>
    )
  }
}

export const DashboardPage = DashboardPageComponent
