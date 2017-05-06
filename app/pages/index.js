import React from 'react'

import Link from 'next/link'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

import Layout from '../components/layout'
import log from '../lib/log'
import withData from '../lib/withData'

@withData
export default class IndexPage extends React.Component {
  render() {
    log.debug('pages/index#render')

    const { url: { pathname } } = this.props

    log.debug('pages/index#render pathname', pathname)

    return (
      <Layout>
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
      </Layout>
    )
  }
}
