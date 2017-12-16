import Head from "next/head";
import * as React from "react";

import { Header } from "./header";

interface ILayoutProps {
  title: string;
  pathname: string;
  children?: React.ReactElement<any>;
}

export function Layout(props: ILayoutProps) {
  const {
    children,
    title,
    pathname,
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
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-table/6.6.0/react-table.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      </Head>

      <Header pathname={pathname} />
      {children}
    </main>
  );
}
