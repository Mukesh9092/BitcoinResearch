import React from 'react';
import { History } from 'history';
import { Route, Link } from 'react-router-dom';

import { About } from '../about';
import { Home } from '../home';

import * as styles from './styles';

interface Props {
  history: History;
}

export const App = (props: Props) => (
  <React.Fragment>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>

    <hr />

    <Route exact={true} path="/" component={Home} />
    <Route path="/about" component={About} />
    <div className={styles.container}>8</div>
  </React.Fragment>
);
