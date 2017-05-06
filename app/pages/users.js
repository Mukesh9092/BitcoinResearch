import React from 'react'
import { Row, Col } from 'reactstrap'

import Layout from '../components/layout'
import log from '../lib/log'
import withData from '../lib/withData'

@withData
export default class extends React.Component {
  /*
  static async getInitialProps({ req }) {
  }
  */

  render() {
    log.debug('pages/users#render')

    const { url: { pathname } } = this.props

    return (
      <Layout pathname={pathname}>
        <Row>
          <Col>
            Users
          </Col>
        </Row>
      </Layout>
    )
  }
}
