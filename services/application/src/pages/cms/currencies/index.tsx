import * as React from 'react';
import * as cryptoCoins from 'react-cryptocoins';
import Router from "next/router";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button, Table } from "reactstrap";

import currencyPairs from '../../../../../api/src/graphql/resolvers/RootQuery/currencyPairs';
import currencyPairsStore from '../../../stores/currencyPairs';
import sessionStore from '../../../stores/session';
import userStore from '../../../stores/user';
import { Container } from "../../../components/common/container";
import { CurrencyPairsStore, ICurrencyPair } from '../../../stores/currencyPairs';
import { IApplicationPageProps } from "../../../types/application";
import { IGetInitialPropsContext } from '../../../types/next';
import { Layout } from "../../../components/pages/cms/layout";

interface IIconProps {
  currency: string;
}

const Icon = (props: IIconProps) => {
  const { currency } = props;

  const iconKey = currency.substring(0, 1).toUpperCase() + currency.substring(1).toLowerCase();

  const IconComponent = cryptoCoins[iconKey];

  if (IconComponent) {
    return <IconComponent />;
  }

  return null;
};

const handleRowClick = (currencyAKey: string, currencyBKey: string) => () => {
  Router.push(`/cms/currencies/chart?currencyPair=${currencyAKey}_${currencyBKey}`);
};

interface ICurrenciesProps {
  currencyPairsStore: CurrencyPairsStore;
}

const Currencies = (props: ICurrenciesProps) => {
  const { currencyPairsStore } = props;

  if (!currencyPairsStore.list) {
    return null;
  }

  const currencyElements = currencyPairsStore.list.map((currencyPair: ICurrencyPair, i: number): React.ReactElement<any> => {
    const {
      id,
      key,
      currencyA,
      currencyB,
      volume24h: { currencyAVolume, currencyBVolume }
    } = currencyPair;

    return (
      <tr
        key={i}
        onClick={handleRowClick(currencyA.key, currencyB.key)}
      >
        <td><Icon currency={currencyA.key} /></td>
        <td>{currencyA.key}</td>
        <td>{currencyAVolume}</td>

        <td><Icon currency={currencyB.key} /></td>
        <td>{currencyB.key}</td>
        <td>{currencyBVolume}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      {currencyElements}
    </React.Fragment>
  );
};

export interface ICMSCurrenciesPageProps extends IApplicationPageProps {
  currencyPairsStore: CurrencyPairsStore
}

export default class CMSCurrenciesPage extends React.Component<ICMSCurrenciesPageProps, any> {
  // TODO: ensureAuthenticated
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    // console.log('CMSCurrenciesPage#getInitialProps');

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    await currencyPairsStore.load();

    return {
      sessionStore,
      userStore,
      currencyPairsStore,
      pathname,
      query,
      asPath,
    };
  }

  render() {
    const {
      pathname,
      sessionStore,
      userStore,
      currencyPairsStore,
    } = this.props;

    return (
      <Provider
        sessionStore={sessionStore}
        userStore={userStore}
        currencyPairsStore={currencyPairsStore}
      >
        <Layout
          title="CMS / Currencies"
          pathname={pathname}
        >
          <Container>
            <Row>
              <Col>
                <h1>Currencies</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <td></td>
                      <td>Currency A</td>
                      <td>Volume</td>

                      <td></td>
                      <td>Currency B</td>
                      <td>Volume</td>
                    </tr>
                  </thead>

                  <tbody>
                    <Currencies
                      currencyPairsStore={currencyPairsStore}
                    />
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
