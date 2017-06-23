import React from 'react'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

import { ConnectedPage } from '../components'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'

export default class PublicIndexPage extends ConnectedPage {
  renderPageComponent() {
    console.log('PublicIndexPage#renderPageComponent', this.props)

    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Welcome</h1>
                <p className="lead">
                  LALALALALALALALALALALALALALALALALALALALAA

                  This should be a dashboard in the future.
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
