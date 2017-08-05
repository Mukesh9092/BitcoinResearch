import React from "react";
import { Row, Col } from "reactstrap";

import { ConnectedPage } from "../components/index";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";
import { LoginForm } from "../components/pages/public/login/form";

export default class PublicLoginPage extends React.Component {
  render() {
    console.log("PublicLoginPage#render", this.props);

    return (
      <ConnectedPage>
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
      </ConnectedPage>
    );
  }
}
