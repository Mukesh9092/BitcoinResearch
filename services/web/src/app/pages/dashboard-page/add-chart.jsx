import * as React from 'react'
import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { createChart } from '../../../../common/domain/mutations/createChart'

import { Select } from '../../components/select'

import * as styles from './styles.scss'

export class AddChartComponent extends React.Component {
  state = {
    market: null,
  }

  handleOnChange = (market) => {
    this.setState({ market })
  }

  render () {
    const { applicationStore } = this.props
    let content

    if (applicationStore.user.dashboard.marketsQuery.state === 'pending') {
      content = (
        <div className={styles.loading}>
          <h1>wat</h1>
          <CircularProgress />
        </div>
      )
    } else if (applicationStore.user.dashboard.marketsQuery.state === 'error') {
      content = (
        <div className={styles.error}>
          <h1>Error</h1>
          <pre>{JSON.stringify(applicationStore.user.dashboard.marketsQuery.error)}</pre>
        </div>
      )
    } else {
      const data = applicationStore.user.dashboard.marketsQuery.result

      if (!data || !data.length) {
        content = (
          <div className={styles.empty}>
            <p>No markets.</p>
          </div>
        )
      } else {
        const sortedData = sortBy(data, ['quote', 'base'])
        const options = sortedData.map((x) => ({
          label: `${x.quote}/${x.base}`,
          value: x.id,
        }))

        content = (
          <Select
            className={styles.textField}
            options={options}
            onChange={this.handleOnChange}
            value={this.state.market}
            placeholder='Market'
            disabled={applicationStore.user.dashboard.marketsState === 'pending'}
          />
        )
      }
    }

    return (
      <div className={styles.addChart}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <h3>Add Chart</h3>

              {content}

              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='center'
                className={styles.addChartButtons}
              >
                <Grid item>
                  <Button
                    variant='text'
                    color='secondary'
                    aria-label='Cancel'
                    className={styles.addChartCancelButton}
                    onClick={this.props.onCancel}
                    disabled={this.props.applicationStore.user.dashboard.createChartsState === 'pending'}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    aria-label='Save'
                    className={styles.addChartSaveButton}
                    onClick={async (event) => {
                      event.preventDefault()

                      await this.props.applicationStore.user.dashboard.createChartMutation.mutate({
                        mutation: createChart,
                        variables: {
                          dashboardId: this.props.applicationStore.user.dashboard.id,
                          marketId: this.state.market.value,
                        },
                      })

                      // await this.props.applicationStore.setUserWithDashboardWithChartsWithMarketForUserId(
                      //   this.props.applicationStore.user.id,
                      // )
                    }}
                    disabled={this.props.applicationStore.user.dashboard.createChartsState === 'pending'}
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

export const AddChart = inject('applicationStore')(observer(AddChartComponent))
