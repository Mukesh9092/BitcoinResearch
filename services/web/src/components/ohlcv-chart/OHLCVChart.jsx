import * as React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { Chart, ChartCanvas } from 'react-stockcharts'

import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import {
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'

class OHLCVChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      margin: props.margin,
      minimumWidth: 100,
      minimumHeight: 100,

      timeFormat: timeFormat('%Y-%m-%d %H:%M:%S'),
      ohlcvNumberFormat: format('.8f'),
      volumeNumberFormat: format('.4s'),
      xScaleProvider: discontinuousTimeScaleProvider.inputDateAccessor(this.timestampToDate),
    }
  }

  getGridWidth(width) {
    const { margin } = this.state

    return width - margin.left - margin.right
  }

  getGridHeight(height) {
    const { margin } = this.state

    return height - margin.top - margin.bottom
  }

  timestampToDate = (d) => {
    return new Date(d.timestamp)
  }

  renderOHLCVChart({ width, height }) {
    const { timeFormat, ohlcvNumberFormat } = this.state

    const chartHeight = height * 0.8

    return (
      <Chart
        id={1}
        yExtents={[
          (d) => {
            return [d.high, d.low]
          },
        ]}
        height={chartHeight}
      >
        <XAxis
          axisAt="bottom"
          orient="bottom"
          showTicks={false}
          innerTickSize={-1 * chartHeight}
          tickFormat={timeFormat}
          tickStrokeDasharray="ShortDot"
          tickStrokeOpacity={0.2}
          tickStrokeWidth={1}
        />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={5}
          innerTickSize={-1 * width}
          tickFormat={ohlcvNumberFormat}
          tickStrokeDasharray="ShortDot"
          tickStrokeOpacity={0.2}
          tickStrokeWidth={1}
        />
        <MouseCoordinateY at="right" orient="right" displayFormat={ohlcvNumberFormat} />
        <CandlestickSeries />
        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          displayFormat={ohlcvNumberFormat}
          yAccessor={(d) => {
            return d.close
          }}
          fill={(d) => {
            return d.close > d.open ? '#6BA583' : '#FF0000'
          }}
        />
        <OHLCTooltip forChart={1} origin={[-40, 0]} xDisplayFormat={timeFormat} ohlcFormat={ohlcvNumberFormat} />
      </Chart>
    )
  }

  renderVolumeChart({ width, height }) {
    const { timeFormat, volumeNumberFormat } = this.state

    const chartHeight = height * 0.2

    return (
      <Chart
        id={2}
        yExtents={[
          (d) => {
            return d.volume
          },
        ]}
        height={chartHeight}
        origin={(w, h) => {
          return [0, h - chartHeight]
        }}
      >
        <XAxis
          axisAt="bottom"
          orient="bottom"
          innerTickSize={-1 * chartHeight}
          tickFormat={timeFormat}
          tickStrokeDasharray="ShortDot"
          tickStrokeOpacity={0.2}
          tickStrokeWidth={1}
        />
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          innerTickSize={-1 * width}
          tickFormat={volumeNumberFormat}
          tickStrokeDasharray="ShortDot"
          tickStrokeOpacity={0.2}
          tickStrokeWidth={1}
        />
        <MouseCoordinateX rectWidth={60} at="bottom" orient="bottom" displayFormat={timeFormat} />
        <MouseCoordinateY at="left" orient="left" displayFormat={volumeNumberFormat} />
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
          displayFormat={volumeNumberFormat}
          fill="#0F0F0F"
        />
      </Chart>
    )
  }

  render() {
    const { name, data, onDownloadMore } = this.props
    const { margin, minimumWidth, minimumHeight, xScaleProvider } = this.state

    // Prepare the data for the chart.
    const sanitizedData = data.map((x) => {
      return {
        timestamp: new Date(x.datetime),
        ...x,
      }
    })
    const scaledData = xScaleProvider(sanitizedData)

    const start = scaledData.xAccessor(last(scaledData.data))
    const end = scaledData.xAccessor(scaledData.data[Math.max(0, scaledData.data.length - 150)])
    const xExtents = [start, end]

    return (
      <ContainerDimensions>
        {(containerProps) => {
          // Prevent weird rendering bugs by setting a minimum width and height.
          const width = Math.max(minimumWidth, containerProps.width)
          const height = Math.max(minimumHeight, containerProps.height)

          // Size minus margins for the charts inside the canvas.
          const scaledWidth = this.getGridWidth(width)
          const scaledHeight = this.getGridHeight(height)

          debugger

          return (
            <ChartCanvas
              type="hybrid"
              seriesName={name}
              ratio={1}
              width="100%"
              height="100%"
              margin={margin}
              data={scaledData.data}
              // onLoadMore={onDownloadMore}
              xAccessor={scaledData.xAccessor}
              xExtents={xExtents}
              xScale={scaledData.xScale}
              displayXAccessor={(x) => {
                return x.date
              }}
            >
              {this.renderOHLCVChart({
                width: scaledWidth,
                height: scaledHeight,
              })}
              {this.renderVolumeChart({
                width: scaledWidth,
                height: scaledHeight,
              })}
              <CrossHairCursor />
            </ChartCanvas>
          )
        }}
      </ContainerDimensions>
    )
  }
}

export default OHLCVChart
