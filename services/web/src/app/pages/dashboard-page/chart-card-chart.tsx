import * as React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'
import { startOfYear, endOfYear } from 'date-fns'
import { Query } from 'react-apollo'

import { IOHLCV } from '../../../../common/domain/types/IOHLCV'
import { IChart } from '../../../../common/domain/types/IChart'
import { IApolloQueryResult } from '../../../../common/apollo/types/IApolloQueryResult'
import { oHLCVs } from '../../../../common/domain/queries/oHLCVs'

import { OHLCVChart } from './ohlcv-chart'
import * as styles from './styles.scss'

interface IChartProps {
  width: number
  chart: IChart
}

interface IChartState {
  height: number
}

export class ChartCardChart extends React.Component<IChartProps, IChartState> {
  public state: IChartState = {
    height: 300,
  }

  public render (): React.ReactElement<Paper> {
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
        {(oHLCVsQueryResult: IApolloQueryResult<IOHLCV[]>) => {
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
            <OHLCVChart
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
