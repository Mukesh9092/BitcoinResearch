import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import Page from '../../page/index'
import OHLCVChartContainer from '../../ohlcv-chart/OHLCVChartContainer'

import * as styles from './styles.scss'

@withRouter
@inject('store')
@observer
class ChartPageComponent extends React.Component {
  componentWillMount() {
    const {
      store: { chartStore },
      match: {
        params: { chartId },
      },
    } = this.props

    chartStore.fetch({
      id: chartId,
    })
  }

  renderLoading() {
    return (
      <Page>
        <Grid
          item
          xs={12}
          style={{
            position: 'relative',
          }}
        >
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        </Grid>
      </Page>
    )
  }

  render() {
    const {
      store: {
        chartStore,
        chartStore: { fetch },
      },
    } = this.props

    if (fetch.pending) {
      return this.renderLoading()
    }

    if (fetch.error) {
      throw fetch.error
    }

    return (
      <Page>
        <Grid item xs={12}>
          <div className="CHILD" />
          {/*<OHLCVChartContainer chart={chartStore} containerClassName={styles.container} />*/}
        </Grid>
      </Page>
    )
  }
}

export const ChartPage = ChartPageComponent
