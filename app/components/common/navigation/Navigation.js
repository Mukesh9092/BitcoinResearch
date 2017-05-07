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

    return (
      <Navbar
        toggleable
        {...navbarProps}
      >
        <NavbarToggler right onClick={this.toggle} />

        <Nav className="mr-auto" navbar>
          {leftContent}
        </Nav>

        <Collapse isOpen={this.state.isOpen} navbar>
          {collapseContent}
        </Collapse>
      </Navbar>
    )
  }
}
