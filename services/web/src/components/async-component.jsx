import * as React from 'react'

export class AsyncComponent extends React.Component {
  renderPending() {
    return null
  }

  renderRejected(error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  renderResolved() {
    return null
  }

  render() {
    return this.query.match({
      pending: this.renderPending.bind(this),
      rejected: this.renderRejected.bind(this),
      resolved: this.renderResolved.bind(this),
    })
  }
}
