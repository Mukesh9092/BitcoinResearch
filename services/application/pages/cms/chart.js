import React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Row, Col, Table } from "reactstrap";
import * as cryptoCoins from "react-cryptocoins";
import ReactTable from "react-table";
// import "react-table/react-table.css";

import { ChartCanvas, Chart as StockChart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { Application } from "../../stores/application";
import { Chart } from "../../stores/chart";

import ApplicationPage from "../../components/ApplicationPage";
import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

const MarketChart = fitWidth(class MarketChart extends React.Component {
  render() {
    const {
      candlesticks,
    } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.id));

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
        ratio={1}
        width={800}
        height={400}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type="hybrid"
        seriesName="MSFT"
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
})

export default class CMSChartPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const chart = new Chart();

    const currencyA = 'BTC';
    const currencyB = 'XRP';
    const period = 86400;
    const start = 1483225200;
    const end = Math.ceil((new Date()).valueOf() / 1000);

    await chart.load(currencyA, currencyB, period, start, end);

    return {
      ...initialProps,
      chart,
    };
  }

  render() {
    console.log("CMSChartPage#render", this.props);

    const application = this.application || this.props.application;
    const candlesticks = this.props.chart.candlesticks;

    return (
      <Provider
        application={application}
        candlesticks={candlesticks}
      >
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <MarketChart candlesticks={candlesticks} />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
