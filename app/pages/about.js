import React from 'react'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

import { ConnectedPage } from '../components/index'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'

export default class PublicAboutPage extends React.Component {
  render() {
    console.log('PublicAboutPage#render', this.props)

    return (
      <ConnectedPage>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <h1>About</h1>
              </Col>
            </Row>
          </Container>
        </Layout>
      </ConnectedPage>
    )
  }
}
