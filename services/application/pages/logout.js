import React from "react";
import { Provider } from "mobx-react";
import { Row, Col } from "reactstrap";

import ApplicationPage from "../components/ApplicationPage";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";
import { LoginForm } from "../components/pages/public/login/form";

export default class PublicLoginPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    await initialProps.application.session.logout();

    return initialProps;
  }

  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
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
