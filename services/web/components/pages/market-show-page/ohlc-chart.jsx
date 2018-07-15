import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Query } from 'react-apollo'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ChartCanvas, Chart } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'

import { log } from '../../.././common/log'

import getOHLCQuery from '../../../queries/getOHLC'

const styles = (theme) => {
  return {}
}

export const OHLCChartDataLoader = (props) => {
  const { classes, marketKey, period, from, to } = props

  return (
    <Query query={getOHLCQuery} variables={{ key: marketKey, period, from, to }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <h1>LOADING</h1>
        }

        if (error) {
          return (
            <React.Fragment>
              <h1>Error</h1>
              <pre>{JSON.stringify(error)}</pre>
            </React.Fragment>
          )
        }

        const { getOHLC } = data
      }}
    </Query>
  )
}

export const OHLCChartComponent = (props) => {
  const { type, data: initialData, width, ratio } = props

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => {
      return d.date
    },
  )
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    initialData,
  )

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 150)])
  const xExtents = [start, end]

  return (
    <React.Fragment>
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={2}
          yExtents={[
            (d) => {
              return d.volume
            },
          ]}
          height={150}
          origin={(w, h) => {
            return [0, h - 150]
          }}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format('.2s')}
          />

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format('.4s')}
          />

          <BarSeries
            yAccessor={(d) => {
              return d.volume
            }}
            fill={(d) => {
              return d.close > d.open ? '#6BA583' : '#FF0000'
            }}
          />

          <CurrentCoordinate
            yAccessor={(d) => {
              return d.volume
            }}
            fill="#9B0A47"
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => {
              return d.volume
            }}
            displayFormat={format('.4s')}
            fill="#0F0F0F"
          />
        </Chart>
        <Chart
          id={1}
          yExtents={[
            (d) => {
              return [d.high, d.low]
            },
          ]}
          padding={{ top: 40, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateX
            rectWidth={60}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%H:%M:%S')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />

          <CandlestickSeries />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => {
              return d.close
            }}
            fill={(d) => {
              return d.close > d.open ? '#6BA583' : '#FF0000'
            }}
          />

          <OHLCTooltip
            origin={[-40, 0]}
            xDisplayFormat={timeFormat('%Y-%m-%d %H:%M:%S')}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>{' '}
    </React.Fragment>
  )
}

export const OHLCChart = withStyles(styles)(OHLCChartDataLoader)
