import Router from 'next/router';

import { isBrowser } from "../common/environment";

export default (ctx, sessionStore) => {
  // console.log("ensureUnauthenticatedContext");

  if (isBrowser()) {
    // console.log("ensureUnauthenticated browser isAuthenticated", sessionStore.isAuthenticated);

    if (sessionStore.isAuthenticated) {
      Router.push("/cms");
    }
  } else {
    // console.log("ensureUnauthenticated server isAuthenticated", sessionStore.isAuthenticated);

    if (sessionStore.isAuthenticated) {
      ctx.res.writeHead(302, {
        Location: "/cms"
      });
      ctx.res.end();
    }
  }
};
