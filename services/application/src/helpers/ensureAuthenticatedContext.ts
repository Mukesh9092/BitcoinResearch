import Router from 'next/router';

import { isBrowser } from "../common/environment";

export default (ctx, application) => {
  console.log("ApplicationPage#ensureAuthenticated");

  if (isBrowser()) {
    // console.log("ApplicationPage#ensureAuthenticated browser isAuthenticated", application.session.isAuthenticated());

    if (!application.session.isAuthenticated()) {
      Router.push("/login");
    }
  } else {
    // console.log("ApplicationPage#ensureAuthenticated server", ctx.req.user);

    if (!ctx.req.user) {
    ctx.res.writeHead(302, {
      Location: "/login"
    });
    ctx.res.end();
    }
  }
};