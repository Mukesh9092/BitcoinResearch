import * as React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'
import { startOfYear, endOfYear } from 'date-fns'
import { Query } from 'react-apollo'

import { oHLCVs } from '../../../../common/domain/queries/oHLCVs'

import * as styles from './styles.scss'

export class ChartCardChart extends React.Component {
  state = {
    height: 300,
  }

  render () {
    const { width, chart } = this.props
    const { height } = this.state

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

    return (
      <Query query={oHLCVs} variables={queryVariables} ref={this.chartRef}>
        {(oHLCVsQueryResult) => {
          if (oHLCVsQueryResult.loading) {
            return (
              <div className={styles.loading}>
                <CircularProgress />
              </div>
            )
          }

          if (oHLCVsQueryResult.errors && oHLCVsQueryResult.errors.length) {
            return (
              <div className={styles.error}>
                <h1>Error</h1>
                <pre>{JSON.stringify(oHLCVsQueryResult.errors)}</pre>
              </div>
            )
          }

          const { oHLCVs } = oHLCVsQueryResult.data

          if (!oHLCVs || !oHLCVs.length) {
            return (
              <div className={styles.empty}>
                <p>No chart data.</p>
              </div>
            )
          }

          return (
            <OhlcvChart
              name={`${chart.market.quote}/${chart.market.base}`}
              type='hybrid'
              ohlcv={oHLCVs}
              width={width}
              height={height}
              ratio={1}
              drawVolume={false}
            />
          )
        }}
      </Query>
    )
  }
}
