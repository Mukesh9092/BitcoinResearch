import React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Row, Col, Table } from "reactstrap";
import * as cryptoCoins from "react-cryptocoins";
import Link from "next/link";
import ReactTable from "react-table";
// import "react-table/react-table.css";

import ApplicationPage from "../../../components/ApplicationPage";
import { Application } from "../../../stores/application";
import { Container } from "../../../components/common/container";
import { Currencies } from "../../../stores/currencies";
import { Layout } from "../../../components/pages/cms/layout";

export default class CMSCurrenciesPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    const currencies = new Currencies();

    await currencies.load();

    return {
      ...initialProps,
      currencies
    };
  }

  renderCurrencies() {
    // console.log("CMSCurrenciesPage#renderCurrencies");

    const { currencies } = this.props;

    return currencies.list.map((currency, i) => {
      const { key, name, minConf, txFee, depositAddress } = currency;

      const iconKey =
        key.substring(0, 1).toUpperCase() + key.substring(1).toLowerCase();
      const IconComponent = cryptoCoins[iconKey];

      let icon = null;
      if (IconComponent) {
        icon = <IconComponent />;
      }

      const link = `/cms/currencies/chart?currencyPair=BTC_${key}`;

      return (
        <tr key={i}>
          <td>{icon}</td>

          <td>
            <Link href={link} prefetch>
              <a href={link}>{key}</a>
            </Link>
          </td>

          <td>{name}</td>
          <td>{+txFee}</td>
          <td>{minConf}</td>
        </tr>
      );
    });
  }

  render() {
    // console.log("CMSCurrenciesPage#render", this.props);

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
                      <td>Icon</td>
                      <td>Name</td>
                      <td>Key</td>
                      <td>TXFEE</td>
                      <td>MINCONF</td>
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
