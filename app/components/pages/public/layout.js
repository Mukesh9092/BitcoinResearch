import Head from 'next/head'
import React from 'react'

import { Header } from './header'
import { Footer } from './footer'

export function Layout({ children, title = 'CMS', url: { pathname }}) {
  return (
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
      {children}
      <Footer />
    </main>
  )
}
