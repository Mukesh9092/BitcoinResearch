import * as React from 'react'
import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { Select } from '../../components/select'

import * as styles from './styles.scss'
import { getUserWithDashboardWithChartsWithMarketByUserId } from '../../../common/domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class AddChartComponent extends React.Component {
  state = {
    market: null,
  }

  handleOnChange = (market) => {
    this.setState({ market })
  }

  handleOnClick = async (event) => {
    event.preventDefault()

    const { applicationStore, dashboardStore, onComplete } = this.props
    const { market } = this.state

    await dashboardStore.createChart({
      userId: applicationStore.user.id,
      dashboardId: dashboardStore.id,
      marketId: market.value,
    })

    if (onComplete) {
      onComplete()
    }
  }

  renderLoading() {
    return (
      <div className={styles.loading}>
        <h1>wat</h1>
        <CircularProgress />
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <p>No markets.</p>
      </div>
    )
  }

  renderError() {
    const { dashboardStore } = this.props

    return (
      <div className={styles.error}>
        <h1>Error</h1>
        <pre>{JSON.stringify(dashboardStore.marketsQuery.error)}</pre>
      </div>
    )
  }

  renderDropdown({ options }) {
    const { dashboardStore } = this.props
    const { market } = this.state

    return (
      <Select
        className={styles.textField}
        options={options}
        onChange={this.handleOnChange}
        value={market}
        placeholder="Market"
        disabled={dashboardStore.marketsState === 'pending'}
      />
    )
  }

  render() {
    const { onCancel, dashboardStore } = this.props
    let content

    if (dashboardStore.marketsQuery.state === 'pending') {
      content = this.renderLoading()
    } else if (dashboardStore.marketsQuery.state === 'error') {
      content = this.renderError()
    } else {
      const data = dashboardStore.markets

      if (!data || !data.length) {
        content = this.renderEmpty()
      } else {
        const sortedData = sortBy(data, ['quote', 'base'])
        const options = sortedData.map((x) => ({
          label: `${x.quote}/${x.base}`,
          value: x.id,
        }))

        content = this.renderDropdown({
          options,
        })
      }
    }

    const createChartsState = dashboardStore.createChartMutation.state

    return (
      <div className={styles.addChart}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <h3>Add Chart</h3>

              {content}

              <Grid container direction="row" justify="flex-end" alignItems="center" className={styles.addChartButtons}>
                <Grid item>
                  <Button
                    variant="text"
                    color="secondary"
                    aria-label="Cancel"
                    className={styles.addChartCancelButton}
                    onClick={onCancel}
                    disabled={createChartsState === 'pending'}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="Save"
                    className={styles.addChartSaveButton}
                    onClick={this.handleOnClick}
                    disabled={createChartsState === 'pending'}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export const AddChart = AddChartComponent
