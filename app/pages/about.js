import React from 'react'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

import { ConnectedPage } from '../components'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'

export default class PublicAboutPage extends ConnectedPage {
  renderPageComponent() {
    console.log('PublicAboutPage#renderPageComponent', this.props)

    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              <h1>About</h1>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
