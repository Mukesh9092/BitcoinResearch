import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
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

    return {
      pageProps: {
        ...pageProps,
      },
    }
  }

  public render() {
    const { Component, pageProps } = this.props

    console.log('App:render:pageProps', pageProps)

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
