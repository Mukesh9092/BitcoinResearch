import Router from 'next/router';

import { isBrowser } from "../common/environment";

export default (ctx, sessionStore) => {
  // console.log("ensureAuthenticatedContext");

  if (isBrowser()) {
    // console.log("ensureAuthenticated browser isAuthenticated", sessionStore.isAuthenticated);

    if (!sessionStore.isAuthenticated) {
      Router.push("/login");
    }
  } else {
    // console.log("ensureAuthenticated server isAuthenticated", sessionStore.isAuthenticated);

    if (!sessionStore.isAuthenticated) {
      ctx.res.writeHead(302, {
        Location: "/login"
      });
      ctx.res.end();
    }
  }
};