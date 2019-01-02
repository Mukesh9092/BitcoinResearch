import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import { debounce } from 'lodash'
import { inject, observer } from 'mobx-react'
import { startOfYear, endOfYear, subDays, addMonths } from 'date-fns'

import { OHLCVChart } from '../../../components/ohlcv-chart'

import * as styles from './styles.scss'

@inject('applicationStore')
@inject('dashboardStore')
@observer
class ChartCardChartComponent extends React.Component {
  state = {
    height: 300,
    start: addMonths(startOfYear(new Date()), 6),
    end: endOfYear(new Date()),
  }

  handleDownloadMore = debounce((subtractionAmount) => {
    const { chart } = this.props
    const { start, end } = this.state

    const newStart = subDays(start, Math.abs(subtractionAmount))

    const from = newStart.toISOString()
    const to = end.toISOString()

    console.log('handleDownloadMore', subtractionAmount, from, to)

    this.setState({
      start: newStart,
    })

    chart.getOHLCVs({
      from,
      marketBase: chart.market.base,
      marketQuote: chart.market.quote,
      period: 'DAY1',
      to,
    })
  }, 1000)

  componentWillMount() {
    const { chart } = this.props
    const { start, end } = this.state

    const from = start.toISOString()
    const to = end.toISOString()

    console.log('componentWillMount', from, to)

    chart.getOHLCVs({
      from,
      marketBase: chart.market.base,
      marketQuote: chart.market.quote,
      period: 'DAY1',
      to,
    })
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

    // if (chart.getOHLCVsQuery.state === 'pending') {
    //   return this.renderLoading()
    // }

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
        onDownloadMore={this.handleDownloadMore}
      />
    )
  }
}

export const ChartCardChart = ChartCardChartComponent
