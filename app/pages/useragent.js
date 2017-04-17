import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  render () {
    log.debug('pages/useragent.js Useragent#render', this.props)

    const {
      url: {
        pathname,
      }
    } = this.props

    return (
      <Layout>
        <Header pathname={pathname} />
        Hello World {this.props.userAgent}
        <Footer />
      </Layout>
    )
  }
}
