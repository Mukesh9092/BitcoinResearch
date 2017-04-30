import React from "react";

import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import log from "../lib/log";
import withData from "../lib/withData";

@withData
export default class IndexPage extends React.Component {
  render() {
    log.debug("pages/index#render");

    const { url: { pathname } } = this.props;

    log.debug("pages/index#render pathname", pathname);

    return (
      <Layout>
        <Header pathname={pathname} />
        ASDASDSADAS123123123
        <Footer />
      </Layout>
    );
  }
}
