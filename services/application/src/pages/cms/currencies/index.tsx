import * as cryptoCoins from "react-cryptocoins";
import Link from "next/link";
import * as React from "react";
import * as ReactTable from "react-table";
import Router from "next/router";
import { Provider } from "mobx-react";
import { Row, Col, Table } from "reactstrap";
import { chunk } from "lodash";
// import "react-table/react-table.css";

import { Application } from "../../../stores/application";
import { CurrencyPairs } from "../../../stores/currencyPairs";

import ApplicationPage from "../../../components/ApplicationPage";
import { Container } from "../../../components/common/container";
import { Layout } from "../../../components/pages/cms/layout";

export default class CMSCurrenciesPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const currencyPairs = new CurrencyPairs();

    await currencyPairs.load();

    return {
      ...initialProps,
      currencyPairs
    };
  }

  renderIcon(key) {
    const iconKey = key.substring(0, 1).toUpperCase() + key.substring(1).toLowerCase();
    const IconComponent = cryptoCoins[iconKey];

    if (IconComponent) {
      return <IconComponent />;
    }

    return null;
  }

  renderCurrencies() {
    const { currencyPairs } = this.props;

    return currencyPairs.list.map((currency, i) => {
      const {
        id,
        key,
        currencyA,
        currencyB,
        volume24h: { currencyAVolume, currencyBVolume }
      } = currency;

      const currencyAIcon = this.renderIcon(currencyA.key);
      const currencyBIcon = this.renderIcon(currencyB.key);

      return (
        <tr
          key={i}
          onClick={() => {
            Router.push(
              `/cms/currencies/chart?currencyPair=${currencyA.key}_${currencyB.key}`
            );
          }}
        >
          <td>{currencyAIcon}</td>
          <td>{currencyA.key}</td>
          <td>{currencyAVolume}</td>

          <td>{currencyBIcon}</td>
          <td>{currencyB.key}</td>
          <td>{currencyBVolume}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Provider
        application={this.application || this.props.application}
        currencies={this.props.currencies}
      >
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <Table
                  style={{
                    width: "100%"
                  }}
                >
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
                  <tbody>{this.renderCurrencies()}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
