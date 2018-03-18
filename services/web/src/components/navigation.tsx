import React from 'react';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { Navbar, Button } from '@blueprintjs/core';

interface Props {
  history: History;
}

export const Navigation = (props: Props) => (
  <Navbar>
    <Navbar.Group align="left">
      <Navbar.Heading>Code9</Navbar.Heading>
      <Navbar.Divider />
      <Button className="pt-minimal">
        <Link to="/">Home</Link>
      </Button>
      <Button className="pt-minimal">
        <Link to="/about">About</Link>
      </Button>
    </Navbar.Group>
  </Navbar>
);
