import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import { debounce } from 'lodash'
import { inject, observer } from 'mobx-react'
import { subMonths, subDays } from 'date-fns'

import OHLCVChart from '../../../ohlcv-chart'

import * as styles from './styles.scss'

@inject('store')
@observer
class ChartCardChartComponent extends React.Component {
  state = {
    height: 300,
    start: subMonths(new Date(), 6),
    end: new Date(),
  }

  handleDownloadMore = debounce((subtractionAmount) => {
    const {
      props: { chart },
      state: { start, end },
    } = this

    const newStart = subDays(start, Math.abs(subtractionAmount))

    const from = newStart.toISOString()
    const to = end.toISOString()

    this.setState({
      start: newStart,
    })

    chart.ohlcvStore.fetch({
      from,
      marketBase: chart.marketStore.base,
      marketQuote: chart.marketStore.quote,
      period: 'DAY1',
      to,
    })
  }, 1000)

  componentWillMount() {
    const {
      props: { chart },
      state: { start, end },
    } = this

    const from = start.toISOString()
    const to = end.toISOString()

    chart.ohlcvStore.fetch({
      marketBase: chart.marketStore.base,
      marketQuote: chart.marketStore.quote,
      from,
      to,
      period: 'DAY1',
    })
  }

  static renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  render() {
    const {
      props: { width, chart },
      state: { height },
    } = this

    if (chart.ohlcvStore.fetch.pending) {
      return ChartCardChartComponent.renderLoading()
    }

    if (chart.ohlcvStore.fetch.error) {
      throw chart.ohlcvStore.fetch.error
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
        name={`${chart.marketStore.quote}/${chart.marketStore.base}`}
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
