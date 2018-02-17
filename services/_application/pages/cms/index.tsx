import * as React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import sessionStore from '../../stores/session';
import userStore from '../../stores/user';
import { Container } from "../../components/common/container";
import { IApplicationPageProps } from "../../types/application";
import { IGetInitialPropsContext } from '../../types/next';
import { Layout } from "../../components/pages/cms/layout";
import { ensureAuthenticatedContext } from "../../helpers";

export default class CMSIndexPage extends React.Component<IApplicationPageProps, any> {
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    // ensureAuthenticatedContext(ctx, sessionStore);

    return {
      sessionStore,
      userStore,
      pathname,
      query,
      asPath,
    };
  }

  render() {
    // console.log("CMSIndexPage#render sessionStore", sessionStore.isAuthenticated);

    return (
      <Provider
        sessionStore={this.props.sessionStore}
        userStore={this.props.userStore}
      >
        <Layout
          title="CMS / Dashboard"
          pathname={this.props.pathname}
        >
          <Container>
            <Row>
              <Col>
                <h1>Dashboard</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                Si!
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
