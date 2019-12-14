import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { authenticationInitialProps, AuthenticationProvider } from '../helpers/authentication'
import theme from '../styled/theme'

export default class MyApp extends App {
  // Define getInitialProps on App to disable pre-rendering app-wide since it
  // was giving troubles when using hooks.
  static async getInitialProps({ Component, ctx }) {
    // console.log('App:getInitialProps')
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // console.log('App:getInitialProps:pageProps', pageProps)
    const authentication = authenticationInitialProps(ctx)
    // console.log('App:getInitialProps:authentication', authentication)
    return {
      pageProps: {
        ...pageProps,
        authentication,
      },
    }
  }

  public render() {
    const { Component, pageProps } = this.props

    console.log('App:render:pageProps', pageProps)

    return (
      <AuthenticationProvider authentication={pageProps.authentication}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthenticationProvider>
    )
  }
}
