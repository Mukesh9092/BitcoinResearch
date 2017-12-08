import React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import ApplicationPage from "../components/ApplicationPage";
import { Application } from "../stores/application";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/layout";

export default class PublicIndexPage extends ApplicationPage {
  render() {
    return (
      <Provider application={this.application}>
        <Layout
          title={this.props.title}
          url={this.props.url}
        >
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
      </Provider>
    );
  }
}
