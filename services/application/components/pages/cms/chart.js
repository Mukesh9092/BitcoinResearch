import React from "react";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { ChartCanvas, Chart as StockChart } from "react-stockcharts";
import { Input } from "reactstrap";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";

export class MarketChart extends React.Component {
  render() {
    const {
      candlesticks,
      width,
      ratio,
    } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => {
      const date = new Date(d.id);

      return date;
    });

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(candlesticks);

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type="svg"
        seriesName="BTC_XRP"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}>

        <StockChart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries />
        </StockChart>
      </ChartCanvas>
    );
  }
};

export class MarketChartToolbar extends React.Component {
  render() {
    const {
      currencies,
    } = this.props;

    const options = currencies.list.map(x => <option value={x.key}>{x.key}</option>)

    return (
      <div>
        <Input type="select" name="currencyA" id="currencyA">
          {options}
        </Input>

        <Input type="select" name="currencyB" id="currencyB">
          {options}
        </Input>
      </div>
    )
  }
}
