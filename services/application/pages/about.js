import React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import ApplicationPage from "../components/ApplicationPage";
import { Application } from "../stores/application";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";

export default class PublicAboutPage extends ApplicationPage {
  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <h1>About</h1>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
