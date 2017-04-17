import Head from 'next/head'
import NProgress from 'nprogress'
import React from 'react'
import Router from 'next/router'

import Header from './header'
import Footer from './footer'

import log from '../lib/log'

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

export default ({ children, title = 'CMS' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    </Head>

    <Header />

    { children }

    <Footer />
  </div>
)
