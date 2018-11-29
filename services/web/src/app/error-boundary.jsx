import * as React from 'react'

function formatError (error) {
  return error.stack || error.message || error.toString()
}

export class ErrorBoundary extends React.Component {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch (error, info) {
    this.setState({
      error,
      info,
    })
  }

  render () {
    if (this.state.error) {
      return (
        <div>
          <pre>
            {formatError(this.state.error)}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}
