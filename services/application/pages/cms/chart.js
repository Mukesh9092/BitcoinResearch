import React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Row, Col, Table } from "reactstrap";

import { fitWidth } from "react-stockcharts/lib/helper";

import { Application } from "../../stores/application";
import { Chart } from "../../stores/chart";
import { Currencies } from "../../stores/currencies";

import ApplicationPage from "../../components/ApplicationPage";
import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";
import {
  MarketChart,
  MarketChartToolbar,
} from "../../components/pages/cms/chart";

const FittedMarketChart = fitWidth(MarketChart);

export default class CMSChartPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const currencies = new Currencies();

    await currencies.load();

    const chart = new Chart();

    const currencyA = 'BTC';
    const currencyB = 'ETC';
    const period = 86400;
    const start = 1483225200;
    const end = new Date().valueOf();

    await chart.load(currencyA, currencyB, period, start, end);

    return {
      ...initialProps,
      chart,
      currencies,
    };
  }

  render() {
    console.log("CMSChartPage#render", this.props);

    const application = this.application || this.props.application;

    const {
      currencies,
      chart: {
        candlesticks,
      },
    } = this.props;

    return (
      <Provider
        application={application}
        candlesticks={candlesticks}
      >
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <MarketChartToolbar
                  currencies={currencies}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FittedMarketChart candlesticks={candlesticks} />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
