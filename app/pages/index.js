import React from 'react'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

import { Page } from '../components'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'
import withData from '../lib/withData'

@withData
export default class PublicIndexPage extends Page {
  render() {
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
                <hr className="my-2" />
                <p>For now, there's just the forms.</p>
                <p className="lead">
                  <Button color="primary" href="/">To the Forms!</Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
