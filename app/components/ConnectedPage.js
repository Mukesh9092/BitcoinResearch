import React from 'react'
import {
  Provider,
  observer,
} from 'mobx-react'

import withData from '../lib/withData'
import sessionStore from '../stores/session'

import Page from './Page'

@withData
export default class ConnectedPage extends Page {
  render() {
    const pageComponent = this.renderPageComponent()

    return (
      <Provider sessionStore={sessionStore}>
        {pageComponent}
      </Provider>
    )
  }
}