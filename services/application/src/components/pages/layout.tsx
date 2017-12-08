import Head from "next/head";
import React from "react";

import { Header } from "./header";

export function Layout({ children, title = "CMS", url: { pathname } }) {
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
