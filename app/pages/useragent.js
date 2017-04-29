import React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import log from '../lib/log'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    log.debug('pages/useragent#getInitialProps')
    log.debug('pages/useragent#getInitialProps req', req)

    let userAgent

    if (req) {
      userAgent = req.headers['user-agent']
    } else {
      userAgent = navigator.userAgent
    }

    log.debug('pages/useragent#getInitialProps userAgent', userAgent)

    return {
      userAgent,
    }
  }

  render() {
    log.debug('pages/useragent#render')

    const {
      url: {
        pathname,
      },
      userAgent,
    } = this.props

    log.debug('pages/useragent#render pathname', pathname)

    return (
      <Layout>
        <Header pathname={pathname} />
        123123123 {userAgent}
        <Footer />
      </Layout>
    )
  }
}
