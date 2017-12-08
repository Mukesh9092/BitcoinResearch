import Head from "next/head";
import React from "react";

import { Header } from "./header";

interface ILayoutProps {
  title: string;
  url: {
    pathname: string
  }
  children?: React.ReactElement<any>;
}

export function Layout(props: ILayoutProps) {
  // { children, title = "CMS", url: { pathname } }) {

  const {
    children,
    title,
    url: {
      pathname,
    },
  } = props;

  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/bootstrap.min.css"
        />
      </Head>

      <Header pathname={pathname} />
      {children}
    </main>
  );
}
