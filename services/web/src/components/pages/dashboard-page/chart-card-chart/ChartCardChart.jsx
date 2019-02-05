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
  handleDownloadMore = debounce((subtractionAmount) => {
    const {
      props: { chart },
      state: { from, to },
    } = this

    const newFrom = subDays(new Date(from), Math.abs(subtractionAmount)).toISOString()

    this.setState({
      from: newFrom,
    })

    chart.ohlcvStore.fetch({
      base: chart.marketStore.base,
      quote: chart.marketStore.quote,
      period: chart.period,
      from: newFrom,
      to,
    })
  }, 1000)

  constructor(props) {
    super(props)

    const {
      chart: { from, to },
    } = props

    this.state = {
      height: 300,
      from,
      to,
    }
  }

  componentWillMount() {
    const {
      props: { chart },
      state: { from, to },
    } = this
    
    chart.ohlcvStore.fetch({
      base: chart.marketStore.base,
      quote: chart.marketStore.quote,
      period: chart.period,
      from,
      to,
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
      props: {
        width,
        chart,
        chart: {
          ohlcvStore: { fetch, ohlcvs },
        },
      },
      state: { height },
    } = this

    if (fetch.pending) {
      return ChartCardChartComponent.renderLoading()
    }

    if (fetch.error) {
      throw fetch.error
    }

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
