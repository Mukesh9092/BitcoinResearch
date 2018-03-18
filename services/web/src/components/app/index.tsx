import React from 'react';
import { History } from 'history';
import { Route, Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import { Navigation } from '../navigation';

import { About } from '../pages/about';
import { Home } from '../pages/home';

import * as styles from './styles';

interface Props {
  history: History;
}

export const App = (props: Props) => (
  <React.Fragment>
    <Navigation history={props.history} />
    <Route exact={true} path="/" component={Home} />
    <Route path="/about" component={About} />
  </React.Fragment>
);
