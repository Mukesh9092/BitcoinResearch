import Router from 'next/router';
import * as React from 'react';

import { isBrowser } from '../common/environment';

export interface ApplicationProperties {
  application: Application;
}

export default class ApplicationPage extends React.Component {
  application: Application;

  constructor(props: ApplicationProperties) {
    // console.log("ApplicationPage#constructor");

    super(props);

    if (isBrowser()) {
      this.application = Application.getBrowserInstance(props.application);
    } else {
      this.application = props.application;
    }
  }

  static async getInitialProps(ctx) {
    // console.log("ApplicationPage#getInitialProps");

    let application: Application;

    if (isBrowser()) {
      application = Application.getBrowserInstance(ctx);
    } else {
      application = await Application.getServerInstance(ctx);
    }

    return {
      application,
    };
  }
}
