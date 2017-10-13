import React from "react";
import { chunk } from "lodash";
import { Provider } from "mobx-react";
import { Row, Col, Table } from "reactstrap";
import * as cryptoCoins from "react-cryptocoins";
import ReactTable from "react-table";
// import "react-table/react-table.css";

import ApplicationPage from "../../components/ApplicationPage";
import { Application } from "../../stores/application";
import { Container } from "../../components/common/container";
import { Currencies } from "../../stores/currencies";
import { Layout } from "../../components/pages/cms/layout";

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
    const { currencies } = this.props;

    console.log("currencies", currencies);

    return currencies.list.map(currency => {
      const { key, name, minConf, txFee, depositAddress } = currency;

      const iconKey =
        key.substring(0, 1).toUpperCase() + key.substring(1).toLowerCase();
      const IconComponent = cryptoCoins[iconKey];

      let icon = null;
      if (IconComponent) {
        icon = <IconComponent />;
      }

      return (
        <tr>
          <td>{icon}</td>
          <td>{key}</td>
          <td>{name}</td>
          <td>{txFee}</td>
          <td>{minConf}</td>
        </tr>
      );
    });
  }

  render() {
    console.log("CMSCurrenciesPage#render", this.props);

    return (
      <Provider
        application={this.application || this.props.application}
        currencies={this.props.currencies}
      >
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <ReactTable
                  data={this.props.currencies.list}
                  columns={[
                    {
                      Header: "Name",
                      columns: [
                        {
                          Header: "Icon",
                          id: "icon",
                          accessor: currency => {
                            const iconKey =
                              currency.key.substring(0, 1).toUpperCase() +
                              currency.key.substring(1).toLowerCase();
                            const IconComponent = cryptoCoins[iconKey];

                            let icon = null;
                            if (IconComponent) {
                              icon = <IconComponent />;
                            }

                            return icon;
                          }
                        },
                        {
                          Header: "Key",
                          accessor: "key"
                        },
                        {
                          Header: "Name",
                          accessor: "name"
                        }
                      ]
                    },
                    {
                      Header: "Stats",
                      columns: [
                        {
                          Header: "Fee",
                          id: "txFee",
                          accessor: x => +x.txFee
                        },
                        {
                          Header: "Min Conf",
                          id: "minConf",
                          accessor: x => +x.minConf
                        }
                      ]
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
