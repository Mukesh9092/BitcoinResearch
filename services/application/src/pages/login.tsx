import React from "react";
import { Provider } from "mobx-react";
import { Row, Col } from "reactstrap";

import ApplicationPage from "../components/ApplicationPage";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/layout";
import { LoginForm } from "../components/pages/login/form";

export default class PublicLoginPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureUnauthenticated(ctx, initialProps.application);

    return initialProps;
  }

  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <h1>Login</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
