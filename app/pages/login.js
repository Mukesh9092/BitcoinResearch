import React from "react";
import { Row, Col } from "reactstrap";
import { Provider } from "mobx-react";

import withApolloProvider from "../lib/graphql/withApolloProvider";
// import withMobXProvider from "../lib/mobx/withMobXProvider";
import sessionStore from "../stores/session";

import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";
import { LoginForm } from "../components/pages/public/login/form";

// @withApolloProvider

/*
@withMobXProvider({
  sessionStore,
})
*/

export default class PublicLoginPage extends React.Component {
  render() {
    return (
      <Provider sessionStore={sessionStore}>
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
