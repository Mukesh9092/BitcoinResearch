import { toJS } from "mobx";
import * as React from "react";
import * as d3 from "d3";
// import { LineChart } from "react-d3-basic";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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
    console.log("Chart#render", this.props);

    const {
      currencyPair,
      candlesticks,
      width,
      height,
      ratio,
    } = this.props;

    let data = toJS(candlesticks).map(x => {
      x.time = new Date(x.time);

      return x;
    });

    console.log("Chart#render data", data);
    console.log("Chart#render data.length", data.length);

    return (
      <pre>
        {JSON.stringify(data)}
      </pre>
    )

    /*
    return (
      <LineChart
        width={width}
        height={height}
        margin={{
          top: 5,
          left: 30,
          right: 30,
          bottom: 5,
        }}
        data={data}
      >
        <XAxis dataKey="time"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <CartesianGrid strokeDasharray="3 3"/>
        <Line
          type="monotone"
          datakey="open"
          stroke="#993366"
        />
        <Line
          type="monotone"
          datakey="close"
          stroke="#336699"
        />
      </LineChart>
    );
    */
  }
}
