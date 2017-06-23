import React from 'react'
import { Row, Col } from 'reactstrap'

import { ConnectedPage } from '../../components'
import { Container } from '../../components/common/container'
import { Layout } from '../../components/pages/cms/layout'

export default class CMSIndexPage extends ConnectedPage {
  renderPageComponent() {
    console.log('CMSIndexPage#renderPageComponent', this.props)

    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              CMS INDEX 123
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
