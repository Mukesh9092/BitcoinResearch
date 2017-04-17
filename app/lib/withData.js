import 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { initClient } from './initClient'
import { initStore } from './initStore'

const renderApp = ({ client, store, props, Component }) => (
  <ApolloProvider client={client} store={store}>
    <Component {...props} />
  </ApolloProvider>
)

export default (Component) => (
  class extends React.Component {
    static async getInitialProps(context) {
      const headers = context.req ? context.req.headers : {}
      const client = initClient(headers)
      const store = initStore(client, client.initialState)

      const componentProps = await (Component.getInitialProps ? Component.getInitialProps(context) : {})

      const props = {
        url: {
          query: context.query,
          pathname: context.pathname,
        },
        ...componentProps
      }

      if (!process.browser) {
        const app = renderApp({ client, store, props, Component })
        await getDataFromTree(app)
      }

      const state = store.getState()

      return {
        headers,
        initialState: {
          apollo: {
            data: client.getInitialState().data
          },
          ...state
        },
        ...props
      }
    }

    constructor(props) {
      super(props)

      const {
        headers,
        initialState,
      } = this.props

      this.client = initClient(headers, initialState)
      this.store = initStore(this.client, initialState)
    }

    render() {
      return renderApp({
        client: this.client,
        store: this.store,
        props: this.props,
        Component: Component,
      })
    }
  }
)
