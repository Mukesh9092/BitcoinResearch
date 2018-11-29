import * as React from 'react'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { last } from 'react-stockcharts/lib/utils'

export const OHLCVChartComponent = (props) => {
  const { name, type, ohlcv, width, height, ratio, drawVolume = true } = props

  const sortedOHLCV = ohlcv.sort((a, b) => {
    if (a.timestamp === b.timestamp) {
      return 0
    }

    if (a.timestamp < b.timestamp) {
      return -1
    }

    return 1
  })

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => new Date(d.timestamp))
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(sortedOHLCV)

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 150)])
  const xExtents = [start, end]

  return (
    <React.Fragment>
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 100, top: 10, bottom: 25 }}
        type={type}
        seriesName={name}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={[(d) => [d.high, d.low]]} padding={{ top: 40, bottom: 20 }}>
          <XAxis axisAt='bottom' orient='bottom' />
          <YAxis axisAt='right' orient='right' ticks={5} tickFormat={format('.8f')} />

          <MouseCoordinateX rectWidth={60} at='bottom' orient='bottom' displayFormat={timeFormat('%H:%M:%S')} />
          <MouseCoordinateY at='right' orient='right' displayFormat={format('.8f')} />

          <CandlestickSeries />

          <EdgeIndicator
            itemType='last'
            orient='right'
            edgeAt='right'
            displayFormat={format('.8f')}
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />

          <OHLCTooltip origin={[-40, 0]} xDisplayFormat={timeFormat('%Y-%m-%d %H:%M:%S')} />
        </Chart>

        {drawVolume && (
          <Chart
            id={2}
            yExtents={[(d) => d.volume]}
            height={150}
            origin={(w, h) => [0, h - 150]}
          >
            <YAxis axisAt='left' orient='left' ticks={5} tickFormat={format('.2s')} />

            <MouseCoordinateY at='left' orient='left' displayFormat={format('.4s')} />

            <BarSeries
              yAccessor={(d) => d.volume}
              fill={(d) => (d.close > d.open ? '#6BA583' : '#FF0000')}
            />

            <CurrentCoordinate yAccessor={(d) => d.volume} fill='#9B0A47' />

            <EdgeIndicator
              itemType='last'
              orient='right'
              edgeAt='right'
              yAccessor={(d) => d.volume}
              displayFormat={format('.4s')}
              fill='#0F0F0F'
            />
          </Chart>
        )}

        <CrossHairCursor />
      </ChartCanvas>
    </React.Fragment>
  )
}

export const OHLCVChart = OHLCVChartComponent
