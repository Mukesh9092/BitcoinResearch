import React from "react";
import { Row, Col } from "reactstrap";

import withApolloProvider from "../../lib/react/withApolloProvider";
import withMobXProvider from "../../lib/react/withMobXProvider";
import withAuthentication from "../../lib/react/authentication/withAuthentication";
import sessionStore from "../../stores/session";

import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

@withApolloProvider
@withMobXProvider({
  sessionStore
})
@withAuthentication({
  isAuthenticated: sessionStore.isAuthenticated,
  redirectPath: "/login",
})
export default class CMSIndexPage extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>CMS INDEX 123</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
