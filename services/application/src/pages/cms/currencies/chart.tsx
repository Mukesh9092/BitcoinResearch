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
import { UserStore } from "../../../stores/user";
import { SessionStore } from "../../../stores/session";
import { Container } from "../../../components/common/container";
import { IApplicationPageProps } from "../../../types/application";
import { IGetInitialPropsContext } from '../../../types/next';
import { Layout } from "../../../components/pages/cms/layout";

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

  // TODO: ensureAuthenticated
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    console.log('CMSCurrenciesPage#getInitialProps');

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    // await currencyPairsStore.load();

    const currencyPair = ctx.query.currencyPair;
    const [currencyA, currencyB] = currencyPair.split("_");
    const end = Math.floor(new Date().valueOf() / 1000);
    const start = end - 60 * 60 * 24;
    const period = 300;
    await chartStore.load(currencyA, currencyB, period, start, end);

    return {
      asPath,
      chartStore,
      currencyA,
      currencyB,
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

  render() {
    console.log("CMSChartPage#render", this.props);

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
          <React.Fragment>
            {/* <Toolbar
              currencyA={this.props.currencyA}
              currencyB={this.props.currencyB}
              currencyPair={this.props.currencyPair}
              period={this.props.period}
              start={this.props.start}
              end={this.props.end}
              handlePeriodChange={this.handlePeriodChange}
            /> */}

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
        </Layout>
      </Provider>
    );
  }
}
