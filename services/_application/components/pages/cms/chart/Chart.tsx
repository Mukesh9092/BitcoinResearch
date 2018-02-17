import * as React from "react";
import { scaleTime } from "d3-scale";
import { toJS } from "mobx";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart as StockChart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, first, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import Candlestick from "../../../../common/types/Candlestick"
import { Container } from "../../../components/common/container";
import { Navigation } from "../../../components/common/navigation";

interface IChartState {
}

interface IChartProps {
  candlesticks: Candlestick[]
  currencyA: string
  currencyB: string
  currencyPair: string
  end: number
  height: number
  period: number
  ratio: number
  start: number
  width: number
}

export default class Chart extends React.Component<IChartProps, IChartState> {
  constructor(props: IChartProps) {
    // console.log("Chart#constructor", props);

    super(props);

    this.state = {
    };
  }

  render() {
    // console.log("Chart#render", this.props);

    const {
      currencyPair,
      candlesticks,
      width,
      height,
      ratio,
    } = this.props;

    const candlesticksJS = toJS(candlesticks);

    // console.log("Chart#render candlesticksJS", candlesticksJS, candlesticksJS.length);

    let initialData = candlesticksJS
      .map(x => {
        x.time = new Date(x.time);

        return x;
      });

    const xScaleProviderGetter = (d: { time: Date }): Date => d.time;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(xScaleProviderGetter);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(initialData);

    // console.log('data', data);

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(first(data)),
    ];

    const yExtents = (d: { high: number, low: number }): number[] => [ d.high, d.low ]

    return (
      <ChartCanvas
        type="hybrid"
        seriesName={currencyPair}
        ratio={ratio}
        data={data}
        width={width}
        height={height}
        margin={{
          left: 50,
          right: 50,
          top: 10,
          bottom: 30
        }}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >

        <StockChart
          id={1}
          yExtents={yExtents}
        >
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries />
        </StockChart>
      </ChartCanvas>
    );
  }
}
