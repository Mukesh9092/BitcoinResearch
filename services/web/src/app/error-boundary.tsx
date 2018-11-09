import * as React from 'react'

function formatError (error: Error): string {
  return error.stack || error.message || error.toString()
}

interface IErrorBoundaryProps {
  children: React.ReactChildren
}

interface IErrorBoundaryState {
  error: Error | null
  info: React.ErrorInfo | null
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    error: null,
    info: null,
  }

  public componentDidCatch (error: Error, info: React.ErrorInfo): void {
    this.setState({
      error,
      info,
    })
  }

  public render (): React.ReactNode {
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
