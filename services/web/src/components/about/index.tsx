import React from 'react';
import { History } from 'history';

import * as styles from './styles';

interface Props {
  history: History;
}

export const About = (props: Props) => (
  <React.Fragment>
    <div className={styles.container}>About!</div>
  </React.Fragment>
);
