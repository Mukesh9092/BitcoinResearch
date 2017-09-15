import React from "react";
import { Row, Col } from "reactstrap";

import withApolloProvider from "../lib/react/withApolloProvider";
import withMobXProvider from "../lib/react/withMobXProvider";
import withoutAuthentication from "../lib/react/authentication/withoutAuthentication";
import sessionStore from "../stores/session";

import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";
import { LoginForm } from "../components/pages/public/login/form";

@withApolloProvider
@withMobXProvider({
  sessionStore
})
@withoutAuthentication({
  isAuthenticated: sessionStore.isAuthenticated,
  redirectPath: "/cms",
})
export default class PublicLoginPage extends React.Component {
  render() {
    return (
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
    );
  }
}
