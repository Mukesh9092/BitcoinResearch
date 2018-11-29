import * as React from 'react'
import { findDOMNode } from 'react-dom'

export class FitWidth extends React.Component {
  state = {
    width: 0,
  }

  updateDimensions = () => {
    if (!this.props.componentRef.current) {
      return
    }

    const domNode = findDOMNode(this.props.componentRef.current)

    if (!domNode) {
      return
    }

    const width = domNode.clientWidth

    this.setState({ width })
  }

  getRefWidth () {
    if (!this.props.componentRef.current) {
      return 0
    }

    const domNode = findDOMNode(this.props.componentRef.current)

    if (!domNode) {
      return 0
    }

    return domNode.clientWidth
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)

    this.updateDimensions()
  }

  componentWillMount () {
    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render () {
    const width = this.getRefWidth()

    return this.props.children({ width })
  }
}
