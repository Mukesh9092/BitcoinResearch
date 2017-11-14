import React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Col, Row, ListGroup, ListGroupItem } from "reactstrap";

import { fitWidth, fitDimensions } from "react-stockcharts/lib/helper";

import { isBrowser } from "../../../lib/environment";

import { Application } from "../../../stores/application";
import { Chart } from "../../../stores/chart";
import { Currencies } from "../../../stores/currencies";

import ApplicationPage from "../../../components/ApplicationPage";
import { Container } from "../../../components/common/container";
import { Layout } from "../../../components/pages/cms/layout";
import {
  MarketChart,
  MarketChartNavbar
} from "../../../components/pages/cms/chart";

const FittedMarketChart = fitDimensions(MarketChart);

export default class CMSChartPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    // console.log("CMSChartPage#getInitialProps");

    const { query: { currencyPair } } = ctx;

    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const currencies = new Currencies();

    await currencies.load();

    const chart = new Chart();

    const [currencyA, currencyB] = currencyPair.split("_");
    const period = 86400;
    const end = new Date().valueOf();
    const start = end - 1000 * 60 * 60 * 24 * 365;

    await chart.load(currencyA, currencyB, period, start, end);

    return {
      ...initialProps,
      chart,
      currencies
    };
  }

  render() {
    // console.log("CMSChartPage#render", this.props);

    const application = this.application || this.props.application;

    const {
      currencies,
      chart: { candlesticks },
      url: { query: { currencyPair } }
    } = this.props;

    const [currencyA, currencyB] = currencyPair.split("_");

    return (
      <Provider application={application} candlesticks={candlesticks}>
        <Layout {...this.props}>
          <MarketChartNavbar currencyPair={currencyPair} />

          <Container>
            <FittedMarketChart
              currencyPair={currencyPair}
              candlesticks={candlesticks}
            />
          </Container>
        </Layout>
      </Provider>
    );
  }
}
