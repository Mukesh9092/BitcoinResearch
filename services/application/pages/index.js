import React from "react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import withApolloProvider from "../lib/react/withApolloProvider";
import withMobXProvider from "../lib/react/withMobXProvider";
import sessionStore from "../stores/session";

import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";

@withApolloProvider
@withMobXProvider({
  sessionStore
})
export default class PublicIndexPage extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Welcome</h1>
                <p className="lead">
                  LALALALALALALALALALALALALALALALALALALALAA This should be a
                  dashboard in the future.
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
