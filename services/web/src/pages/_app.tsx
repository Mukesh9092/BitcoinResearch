import App from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { getApolloClient } from '../common/apollo/client'
import { AuthenticationProvider } from '../hooks/authentication'
import theme from '../styled/theme'

const apolloClient = getApolloClient({
  uri: '/graphql'
})

export default class MyApp extends App {
  // Define getInitialProps on App to disable pre-rendering app-wide since it
  // was giving troubles when using hooks.
  static async getInitialProps({ Component, ctx }) {
    // console.log('MyApp#getInitialProps')

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const isAuthenticated = ctx?.req?.isAuthenticated() || false

    let userId: string
    if (ctx?.req?.session?.passport) {
      userId = ctx.req.session.passport.user
    }

    return {
      pageProps: {
        ...pageProps,
        authentication: {
          isAuthenticated,
          user: {
            id: userId,
          },
        }
      },
    }
  }

  public render() {
    const { Component, pageProps } = this.props

    // console.log('MyApp#render:pageProps', pageProps)

    return (
      <AuthenticationProvider value={pageProps.authentication}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </AuthenticationProvider>
    )
  }
}
