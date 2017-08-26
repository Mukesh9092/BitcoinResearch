import React from "react";
import { Row, Col } from "reactstrap";

import { ConnectedPage } from "../../components/index";
import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

export default class CMSIndexPage extends React.Component {
  render() {
    return (
      <ConnectedPage>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>CMS INDEX 123</Col>
            </Row>
          </Container>
        </Layout>
      </ConnectedPage>
    );
  }
}
