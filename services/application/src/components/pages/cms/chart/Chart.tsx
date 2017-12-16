import * as React from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  BarSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { ChartCanvas, Chart as StockChart } from "react-stockcharts";

import { fitDimensions } from "react-stockcharts/lib/helper";

import Candlestick from "../../../../common/types/Candlestick"
import currencyPairs from "../../../../../../api/src/graphql/resolvers/RootQuery/currencyPairs";
import { Container } from "../../../components/common/container";
import { Navigation } from "../../../components/common/navigation";

interface ICandleSticksProps {
  height: number;
}

const CandlesticksYExtents = (d: { high: number, low: number }) => {
  console.log('CandlesticksYExtents', d);

  return [d.high, d.low];
};

const Candlesticks = (props: ICandleSticksProps) => {
  const { height } = props;

  const candlesticksHeight = height / 100 * 80;

  console.log("Candlesticks", candlesticksHeight);

  return (
    <StockChart
      id={1}
      height={height}
      yExtents={CandlesticksYExtents}
    >
      <XAxis axisAt="bottom" orient="bottom" ticks={6} />
      <YAxis
        axisAt="right"
        orient="right"
        ticks={6}
        displayFormat={format(".3s")}
      />
      <MouseCoordinateY
        at="right"
        orient="right"
        displayFormat={format(".3s")}
      />
      <CandlestickSeries />
    </StockChart>
  );
}

interface IVolumeProps {
  height: number;
}

const Volume = (props: IVolumeProps) => {
  const { height } = props;

  const volumeHeight = height / 100 * 20;

  console.log("Volume", volumeHeight);

  return (
    <StockChart
      id={2}
      origin={(w: number, h: number) => [0, h - volumeHeight]}
      height={volumeHeight}
      yExtents={(d: { volume: number }) => d.volume}
    >
      <YAxis
        axisAt="left"
        orient="left"
        ticks={6}
        displayFormat={format(".3s")}
      />
      <MouseCoordinateX
        at="top"
        orient="bottom"
        displayFormat={timeFormat("%X")}
      />
      <MouseCoordinateY
        at="left"
        orient="left"
        displayFormat={format(".3s")}
      />
      <BarSeries height={volumeHeight} yAccessor={(d: { volume: number }) => d.volume} />
    </StockChart>
  );
}

interface IChartState {
  height: number;

  showCandlesticks: boolean;
  showVolume: boolean;
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

export class Chart extends React.Component<IChartProps, IChartState> {
  constructor(props: IChartProps) {
    console.log("Chart#constructor", props);

    super(props);

    this.state = {
      height: 600,

      showCandlesticks: true,
      showVolume: true
    };
  }

  render() {
    console.log("Chart#render", this.props);

    const { showCandlesticks, showVolume } = this.state;
    const { currencyPair, candlesticks, width, height, ratio } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d: { id: number }) => new Date(d.id));

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      candlesticks
    );

    console.log("Chart#render data", data);

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    let candlesticksComponent = null;
    if (showCandlesticks) {
      candlesticksComponent = <Candlesticks height={height} />;
    }

    let volumeComponent = null;
    // if (showVolume) {
    //   volumeComponent = <Volume height={height} />;
    // }

    return (
      <ChartCanvas
        ratio={ratio}
        width={width - 15}
        height={height}
        margin={{
          left: 100,
          right: 100,
          top: 10,
          bottom: 30
        }}
        type="svg"
        seriesName={currencyPair}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        padding={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 50
        }}
      >
        {candlesticksComponent}
        {volumeComponent}

        <CrossHairCursor ratio={ratio} />
      </ChartCanvas>
    );
  }
}

const FittedChart = fitDimensions(Chart);

export default FittedChart;