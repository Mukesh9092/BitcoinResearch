import React from 'react'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
} from 'reactstrap'

export default class Navigation extends React.Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { leftContent, collapseContent, ...navbarProps } = this.props

    const leftContentNav = leftContent && leftContent.length ?
      <Nav className="mr-auto" navbar>
        {leftContent}
      </Nav> : null

    const collapseNav = collapseContent && collapseContent.length ?
      <Collapse isOpen={this.state.isOpen} navbar>
        {collapseContent}
      </Collapse> : null

    return (
      <Navbar
        toggleable
        {...navbarProps}
      >
        <NavbarToggler right onClick={this.toggle} />

        {leftContentNav}
        {collapseNav}
      </Navbar>
    )
  }
}
