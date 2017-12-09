import * as React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Chart } from "../../../stores/chart";

import ApplicationPage from "../../../components/ApplicationPage";
import { Layout } from "../../../components/pages/cms/layout";
import { ChartContainer } from "../../../components/pages/cms/chart";

export default class CMSChartPage extends ApplicationPage {
  constructor(props) {
    console.log("CMSChartPage#constructor");

    super(props);

    if (process.browser) {
      this.chart = Chart.getBrowserInstance(props.chart);
    } else {
      this.chart = props.chart;
    }
  }

  static async getInitialProps(ctx) {
    console.log("CMSChartPage#getInitialProps", this);

    const { query: { currencyPair } } = ctx;

    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const [currencyA, currencyB] = currencyPair.split("_");

    this.chart = new Chart();

    const end = new Date().valueOf();
    const start = end - 1000 * 60 * 60 * 24;
    const period = 300;

    await this.chart.load(currencyA, currencyB, period, start, end);

    return {
      ...initialProps,
      currencyA,
      currencyB,
      period,
      start,
      end,
      chart: this.chart
    };
  }

  render() {
    console.log("CMSChartPage#render");

    const application = this.application || this.props.application;

    const {
      chart,
      currencyA,
      currencyB,
      period,
      start,
      end,
      url: { query: { currencyPair } }
    } = this.props;

    return (
      <Provider application={application}>
        <Layout {...this.props}>
          <ChartContainer
            store={chart}
            load={this.chart.load}
            currencyA={currencyA}
            currencyB={currencyB}
            currencyPair={currencyPair}
            period={period}
            start={start}
            end={end}
          />
        </Layout>
      </Provider>
    );
  }
}
