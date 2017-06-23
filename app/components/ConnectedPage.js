import React from 'react'
import {
  Provider,
  observer,
} from 'mobx-react'

import withData from '../lib/withData'
import sessionStore from '../stores/session'

@withData
export default class ConnectedPage extends React.Component {
  render() {
    return (
      <Provider sessionStore={sessionStore}>
        {this.props.children}
      </Provider>
    )
  }
}