import React from "react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import withApolloProvider from "../lib/react/withApolloProvider";
import sessionStore from "../stores/session";
import userStore from "../stores/user";

import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";

@withApolloProvider
export default class PublicIndexPage extends React.Component {
  static async getInitialProps({ req }) {
    if (process.browser) {
      await sessionStore.loadFromBrowser();

      if (sessionStore.userId) {
        await userStore.loadFromBrowser();
      }
    } else {
      await sessionStore.loadFromServer(req);

      if (sessionStore.userId) {
        await userStore.loadFromServer(req);
      }
    }

  }

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
