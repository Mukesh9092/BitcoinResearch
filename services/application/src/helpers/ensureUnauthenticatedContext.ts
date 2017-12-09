import Router from 'next/router';

import { isBrowser } from "../common/environment";

export default (ctx, application) => {
  console.log("ApplicationPage#ensureUnauthenticated");

  if (isBrowser()) {
    // console.log("ApplicationPage#ensureAuthenticated browser isAuthenticated", application.session.isAuthenticated());

    if (application.session.isAuthenticated()) {
      Router.push("/cms");
    }
  } else {
    // console.log("ApplicationPage#ensureUnauthenticated server", ctx.req.user);

    if (!!ctx.req.user) {
    ctx.res.writeHead(302, {
      Location: "/cms"
    });
    ctx.res.end();
    }
  }
};
