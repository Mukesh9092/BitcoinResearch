import * as React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import sessionStore from '../stores/session';
import userStore from '../stores/user';
import { Container } from "../components/common/container";
import { IApplicationPageProps } from "../types/application";
import { IGetInitialPropsContext } from '../types/next';
import { Layout } from "../components/pages/layout";
import { LoginForm } from "../components/pages/login/form";
import { ensureUnauthenticatedContext } from "../helpers";

export default class PublicLoginPage extends React.Component<IApplicationPageProps, any> {
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    ensureUnauthenticatedContext(ctx, sessionStore);

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
      pathname,
    } = this.props;

    return (
      <Provider
        sessionStore={this.props.sessionStore}
        userStore={this.props.userStore}
      >
        <Layout
          title="Login"
          pathname={pathname}
        >
          <Container>
            <Row>
              <Col>
                <h1>Login</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <LoginForm
                  sessionStore={sessionStore}
                />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
