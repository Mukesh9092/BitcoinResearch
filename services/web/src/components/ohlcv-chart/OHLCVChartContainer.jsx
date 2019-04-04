import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import { debounce } from 'lodash'
import { inject, observer } from 'mobx-react'

import OHLCVChart from './OHLCVChart'
import { ChartStore } from '../../stores/chart-store'

import * as styles from './styles.scss'

@inject('store')
@observer
class OHLCVChartContainer extends React.Component {
  handleDownloadMore = debounce(
    (newStart, newEnd) => {
      const roundedNewStart = Math.ceil(newStart)
      const roundedNewEnd = Math.ceil(newEnd)

      if (roundedNewStart === roundedNewEnd) return

      const {
        props: { chart },
        state: { from, to },
      } = this

      const rows = roundedNewEnd - roundedNewStart
      const newFrom = ChartStore.getNewFromDate(from, chart.period, rows)

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
    },
    1000,
    { leading: false, trailing: true },
  )

  constructor(props) {
    super(props)

    const {
      chart: { from, to },
    } = props

    this.state = {
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

  renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <p>No chart data.</p>
      </div>
    )
  }

  render() {
    const {
      props: {
        containerClassName,
        chart,
        chart: {
          ohlcvStore: { fetch, ohlcvs },
        },
      },
    } = this

    if (fetch.pending) {
      return <div className={containerClassName}>{this.renderLoading()}</div>
    }

    if (!ohlcvs || !ohlcvs.length) {
      return <div className={containerClassName}>{this.renderEmpty()}</div>
    }

    const margin = {
      left: 50,
      right: 80,
      top: 10,
      bottom: 25,
    }

    return (
      // <div className={containerClassName}>
      <OHLCVChart
        margin={margin}
        data={ohlcvs}
        name={`${chart.quote}/${chart.base}`}
        onDownloadMore={this.handleDownloadMore}
      />
      // </div>
    )
  }
}

export default OHLCVChartContainer
