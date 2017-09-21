import React from "react";
import { Row, Col } from "reactstrap";

import withApolloProvider from "../../lib/react/withApolloProvider";
import withAuthentication from "../../lib/react/authentication/withAuthentication";
import sessionStore from "../../stores/session";

import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

@withApolloProvider
@withAuthentication({
  isAuthenticated: sessionStore.isAuthenticated,
  redirectPath: "/login",
})
export default class CMSCurrenciesPage extends React.Component {
  static async getInitialProps({ req }) {
    if (process.browser) {
    } else {
    }
  }

  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>Users</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
