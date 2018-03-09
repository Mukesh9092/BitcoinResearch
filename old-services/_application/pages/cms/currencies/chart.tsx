import * as querystring from "querystring";

import * as Loader from "react-loader";
import Router from "next/router";
import * as React from 'react';
import { Provider } from "mobx-react";
import { toJS } from "mobx";

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
  handlePeriodChange = (period: number): void => {
    const {
      currencyPair,
      start,
      end,
    } = (Router.query as any);

    const newQuery = {
      currencyPair,
      start: end - period * 100,
      end,
      period,
    }

    const newURL = `${Router.pathname}?${querystring.stringify(newQuery)}`;

    Router.replace(newURL);
  };

  static async getInitialProps(ctx: IGetInitialPropsContext) {
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
      start = end - period * 100;

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
    const loaded = !this.props.chartStore.loading

    console.log('##########', loaded);

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
          <Loader
            loaded={loaded}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: '#ff0000',
              zIndex: 9999,
            }}
          >
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
          </Loader>
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
    // console.log("CMSChartPage#render");

    let { candlesticks } = this.props.chartStore;

    let content;
    if (!candlesticks) {
      content = this.renderNoData();
    } else {
      candlesticks = toJS(candlesticks);

      if (candlesticks.length) {
        content = this.renderChart();
      }
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