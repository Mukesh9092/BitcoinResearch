import * as querystring from "querystring";

import Router from "next/router";
import * as React from 'react';
// import * as cryptoCoins from 'react-cryptocoins';
import { Provider } from "mobx-react";

import {
  Row,
  Col,
  Jumbotron,
  Button,
  Table,
} from "reactstrap";

import Chart from "../../../components/pages/cms/chart/Chart";
import Toolbar from "../../../components/pages/cms/chart/Toolbar";
import chartStore from "../../../stores/chart";
import currencyPairsStore from '../../../stores/currencyPairs';
import sessionStore from '../../../stores/session';
import userStore from '../../../stores/user';
import { ChartStore } from "../../../stores/chart";
import { Container } from "../../../components/common/container";
import { IApplicationPageProps } from "../../../types/application";
import { IGetInitialPropsContext } from '../../../types/next';
import { Layout } from "../../../components/pages/cms/layout";
import { SessionStore } from "../../../stores/session";
import { UserStore } from "../../../stores/user";
import { ensureAuthenticatedContext } from "../../../helpers";

export interface ICMSChartPageProps extends IApplicationPageProps {
  asPath: string;
  chartStore: ChartStore;
  currencyA: string;
  currencyB: string;
  currencyPair: string;
  end: number;
  pathname: string;
  period: number;
  query: string;
  sessionStore: SessionStore;
  start: number;
  userStore: UserStore;
}

export default class CMSChartPage extends React.Component<ICMSChartPageProps, any> {
  handlePeriodChange = (event: React.MouseEvent<any>): void => {
    console.log('handlePeriodChange', event);
  };

  static async getInitialProps(ctx: IGetInitialPropsContext) {
    console.log('##########');
    console.log('##########');
    console.log('##########');
    console.log('##########');
    console.log('##########');
    console.log('##########');

    const { err, req, res, pathname, query, asPath } = ctx;

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    // ensureAuthenticatedContext(ctx, sessionStore);

    let {
      currencyPair,
      period,
      start,
      end,
    } = ctx.query;

    if (!start || !end || !period) {
      period = 300;
      end = Math.floor(new Date().valueOf() / 1000);
      start = end - 60 * 60 * 24;

      const newQuery = {
        ...query,
        period,
        start,
        end,
      }

      const newURL = `${pathname}?${querystring.stringify(newQuery)}`;

      if (req && res) {
        res.writeHead(302, {
          Location: newURL,
        })
        res.end()
        res.finished = true
      } else {
        Router.replace(newURL);
      }

      return {};
    }

    const [ currencyAKey, currencyBKey ] = currencyPair.split("_");
    await chartStore.load(currencyAKey, currencyBKey, period, start * 1000, end * 1000);

    return {
      asPath,
      chartStore,
      currencyA: currencyAKey,
      currencyB: currencyBKey,
      currencyPair,
      end,
      pathname,
      period,
      query,
      sessionStore,
      start,
      userStore,
    };
  }

  renderChart() {
    return (
      <React.Fragment>
        <Toolbar
          currencyA={this.props.currencyA}
          currencyB={this.props.currencyB}
          currencyPair={this.props.currencyPair}
          period={this.props.period}
          start={this.props.start}
          end={this.props.end}
          handlePeriodChange={this.handlePeriodChange}
        />

        <Container>
          <Chart
            currencyA={this.props.currencyA}
            currencyB={this.props.currencyB}
            currencyPair={this.props.currencyPair}
            period={this.props.period}
            start={this.props.start}
            end={this.props.end}
            width={800}
            height={600}
            ratio={1}

            candlesticks={this.props.chartStore.candlesticks}
          />
        </Container>
      </React.Fragment>
    );
  }

  renderNoData() {
    return (
      <div>
        <h1>No Data :(</h1>
      </div>
    );
  }

  render() {
    // console.log("CMSChartPage#render", this.props);

    const { candlesticks } = this.props.chartStore;

    let content;
    if (candlesticks && candlesticks.length) {
      content = this.renderChart();
    } else {
      content = this.renderNoData();
    }

    return (
      <Provider
        sessionStore={this.props.sessionStore}
        userStore={this.props.userStore}
        chartStore={this.props.chartStore}
      >
        <Layout
          title="CMS / Chart"
          pathname={this.props.pathname}
        >
          {content}
        </Layout>
      </Provider>
    );
  }
}
