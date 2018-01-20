import * as React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import sessionStore from '../stores/session';
import userStore from '../stores/user';
import { Container } from "../components/common/container";
import { IApplicationPageProps } from "../types/application";
import { IGetInitialPropsContext } from '../types/next';
import { Layout } from "../components/pages/layout";

export default class PublicLogoutPage extends React.Component<IApplicationPageProps, any> {
  // TODO: ensureUnauthenticated
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    return {
      sessionStore,
      userStore,
      pathname,
      query,
      asPath,
    };
  }

  render() {
    const {
      sessionStore,
      userStore,
      pathname,
    } = this.props;

    return (
      <Provider
        sessionStore={sessionStore}
        userStore={userStore}
      >
        <Layout
          title="Logout"
          pathname={pathname}
        >
          <Container>
            <Row>
              <Col>
                <h1>Logging out...</h1>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
