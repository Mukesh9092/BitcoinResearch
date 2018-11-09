import * as React from 'react'
import { inject, observer } from 'mobx-react'

import {
  getUserWithDashboardWithChartsWithMarketByUserId,
} from '../../../../common/domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'

import { AddChart, IAddChartState } from './add-chart'
import { ChartList } from './chart-list'
import { Toolbar } from './toolbar'

import * as styles from './styles.scss'
import { ApplicationStore } from '../../../../common/mobx/application'

export interface IDashboardPageComponentProps {
  applicationStore: ApplicationStore
  userId: string
}
export interface IDashboardPageComponentState {
  showAddChart: boolean
}

const USERID = 'cjnj6iu8u04lg0a838n9wy734'

@inject('applicationStore')
export class DashboardPageComponent extends React.Component<
  IDashboardPageComponentProps,
  IDashboardPageComponentState
> {
  public state: IDashboardPageComponentState = {
    showAddChart: false,
  }

  public handleToolbarAddClick = () => {
    this.setState({
      showAddChart: true,
    })
  }

  public handleAddChartCancel = () => {
    this.setState({
      showAddChart: false,
    })
  }

  public handleAddChartSaveCompleted = () => {
    this.setState({
      showAddChart: false,
    })
  }

  public handleAddChartSave = (createChartMutate: Function) => (data: IAddChartState) => {
    createChartMutate({
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getUserWithDashboardWithChartsWithMarketByUserId,
          variables: {
            userId: this.props.userId,
          },
        },
      ],
      variables: data,
    })
  }

  public componentWillMount (): void {
    this.props.applicationStore.setUserWithDashboardWithChartsWithMarketForUserId(USERID)
  }

  public render (): React.ReactElement<'div'> {
    const { showAddChart } = this.state

    if (!this.props.applicationStore.user) {
      return null
    }

    return (
      <div className={styles.page}>
        <Toolbar onAddClick={this.handleToolbarAddClick} />
        {showAddChart && (
          <AddChart
            onCancel={this.handleAddChartCancel}
            getUserWithDashboardArguments={getUserWithDashboardArguments}
          />
        )}
        <ChartList
          userId={this.props.userId}
          getUserWithDashboardArguments={getUserWithDashboardArguments}
        />
      </div>
    )
  }
}

export const DashboardPage = DashboardPageComponent
