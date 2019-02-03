import * as React from 'react'

function formatError(error) {
  return error.stack || error.message || error.toString()
}

class ErrorBoundary extends React.Component {
  state = {
    error: null,
    stack: null,
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      stack: info.componentStack,
    })
  }

  render() {
    const {
      state: { error, stack },
      props: { children },
    } = this

    if (error) {
      return (
        <div>
          <pre>{formatError(error)}</pre>
          <pre>{stack}</pre>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
