import Head from 'next/head'
import NProgress from 'nprogress'
import React from 'react'
import Router from 'next/router'
import { Container } from 'reactstrap'

import Header from './header/Header'
import Footer from './footer'
import log from '../lib/log'

// import "bootstrap/dist/css/bootstrap.css";

Router.onRouteChangeStart = (url, ...args) => {
  log.debug('onRouteChangeStart', url, args)

  NProgress.start()
}

Router.onRouteChangeComplete = (...args) => {
  log.debug('onRouteChangeStart', args)

  NProgress.done()
}

Router.onRouteChangeError = (...args) => {
  log.debug('onRouteChangeStart', args)

  NProgress.done()
}

export default ({ children, title = 'CMS', pathname }) => (
  <main>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
      />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    </Head>

    <Header pathname={pathname} />
    <Container
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
      fluid
    >
      {children}
    </Container>
    <Footer />
  </main>
)
