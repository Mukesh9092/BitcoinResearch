import React from "react";
import { Row, Col } from "reactstrap";

import withApolloProvider from "../../lib/graphql/withApolloProvider";
import withMobXProvider from "../../lib/mobx/withMobXProvider";
import sessionStore from "../../stores/session";

import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

@withApolloProvider
@withMobXProvider({
  sessionStore
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
