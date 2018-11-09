import * as React from 'react'
import { findDOMNode } from 'react-dom'

export interface IFitWidthChildrenArguments {
  width: number
}

export interface IFitWidthProps<RefType, ChildrenReturnType> {
  componentRef: React.Ref<RefType>
  children (args: IFitWidthChildrenArguments): React.ReactElement<ChildrenReturnType>
}

export interface IFitWidthState {
  width: number
}

export class FitWidth<RefType, ChildrenReturnType> extends React.Component<
  IFitWidthProps<RefType, ChildrenReturnType>,
  IFitWidthState
> {
  public state: IFitWidthState = {
    width: 0,
  }

  public updateDimensions: Function = (): void => {
    if (!this.props.componentRef.current) {
      return
    }

    const domNode = findDOMNode(this.props.componentRef.current)

    if (!domNode) {
      return
    }

    const width: number = domNode.clientWidth

    this.setState({ width })
  }

  public getRefWidth (): number {
    if (!this.props.componentRef.current) {
      return 0
    }

    const domNode = findDOMNode(this.props.componentRef.current)

    if (!domNode) {
      return 0
    }

    return domNode.clientWidth
  }

  public componentDidMount (): void {
    window.addEventListener('resize', this.updateDimensions)

    this.updateDimensions()
  }

  public componentWillMount (): void {
    this.updateDimensions()
  }

  public componentWillUnmount (): void {
    window.removeEventListener('resize', this.updateDimensions)
  }

  public render (): React.ReactElement<ChildrenReturnType> {
    const width = this.getRefWidth()

    return this.props.children({ width })
  }
}
