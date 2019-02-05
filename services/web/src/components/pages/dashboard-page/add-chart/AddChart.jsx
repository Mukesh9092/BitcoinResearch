import * as React from 'react'
import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import { startOfMonth, startOfYear, endOfYear, addMonths } from 'date-fns'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Select from '../../../select'
import { AsyncComponent } from '../../../async-component'

import * as styles from './styles.scss'

@inject('store')
@observer
class AddChartComponent extends AsyncComponent {
  state = {
    market: null,
    createChartLoading: false,
  }

  handleOnChange = (market) => {
    this.setState({ market })
  }

  handleOnClick = async (event) => {
    event.preventDefault()

    const {
      props: {
        store,
        store: { dashboardStore },
        onComplete,
      },
      state: { market },
    } = this

    this.setState({
      createChartLoading: true,
    })

    const [base, quote] = market.value.split('/')

    const options = {
      userId: store.user.id,
      dashboardId: dashboardStore.id,
      base,
      quote,
      // from: addMonths(startOfMonth(startOfYear(new Date())), 6).toISOString(),
      // to: endOfYear(new Date()).toISOString(),
      from: '2018-01-01T00:00:00Z',
      to: '2018-01-02T00:00:00Z',
      period: 'MINUTE1',
    }

    await dashboardStore.createChart(options)

    this.setState({
      createChartLoading: false,
    })

    if (onComplete) {
      onComplete()
    }
  }

  constructor(props) {
    super(props)

    this.query = props.store.dashboardStore.fetchMarkets
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <p>No markets.</p>
      </div>
    )
  }

  renderDropdown({ options }) {
    const {
      store: { dashboardStore },
    } = this.props
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

  renderResolved() {
    const {
      store: {
        dashboardStore: { markets },
      },
    } = this.props

    if (!markets || !markets.length) {
      return this.renderEmpty()
    }

    const sortedData = sortBy(markets, ['quote', 'base'])
    const options = sortedData.map((x) => {
      return {
        label: x.quote,
        value: `${x.base}/${x.quote}`,
      }
    })

    return this.renderDropdown({
      options,
    })
  }

  render() {
    const {
      state: { createChartLoading },
      props: { onCancel },
    } = this

    const content = this.query.match({
      pending: this.renderPending.bind(this),
      rejected: this.renderRejected.bind(this),
      resolved: this.renderResolved.bind(this),
    })

    return (
      <div className={styles.container}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <h3>Add Chart</h3>

              {content}

              <Grid container direction="row" justify="flex-end" alignItems="center" className={styles.buttons}>
                <Grid item>
                  <Button
                    variant="text"
                    color="secondary"
                    aria-label="Cancel"
                    className={styles.cancelButton}
                    onClick={onCancel}
                    disabled={createChartLoading}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="Save"
                    className={styles.saveButton}
                    onClick={this.handleOnClick}
                    disabled={createChartLoading}
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
