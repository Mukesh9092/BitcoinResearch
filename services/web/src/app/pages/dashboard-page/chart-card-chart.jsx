import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { startOfYear, endOfYear } from 'date-fns'

import { OHLCVChart } from './ohlcv-chart'
import * as styles from './styles.scss'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class ChartCardChartComponent extends React.Component {
  state = {
    height: 300,
  }

  componentWillMount() {
    const { chart } = this.props

    const now = new Date()
    const start = startOfYear(now)
    const end = endOfYear(now)

    const queryVariables = {
      from: start.toISOString(),
      marketBase: chart.market.base,
      marketQuote: chart.market.quote,
      period: '1d',
      to: end.toISOString(),
    }

    chart.getOHLCVs(queryVariables)
  }

  renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  renderError() {
    const { chart } = this.props

    return (
      <div className={styles.error}>
        <h1>Error</h1>
        <pre>{JSON.stringify(chart.getOHLCVsQuery.error)}</pre>
      </div>
    )
  }

  render() {
    const { width, chart } = this.props
    const { height } = this.state

    if (chart.getOHLCVsQuery.state === 'initial') {
      return this.renderLoading()
    }

    if (chart.getOHLCVsQuery.state === 'pending') {
      return this.renderLoading()
    }

    if (chart.getOHLCVsQuery.state === 'error') {
      return this.renderError()
    }

    const { ohlcvs } = chart

    if (!ohlcvs || !ohlcvs.length) {
      return (
        <div className={styles.empty}>
          <p>No chart data.</p>
        </div>
      )
    }

    return (
      <OHLCVChart
        name={`${chart.market.quote}/${chart.market.base}`}
        type="hybrid"
        ohlcv={ohlcvs}
        width={width}
        height={height}
        ratio={1}
        drawVolume={false}
      />
    )
  }
}

export const ChartCardChart = ChartCardChartComponent
