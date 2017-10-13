import { get } from "lodash";
import { observable } from "mobx";

import { Session } from "./session";
import { User } from "./user";

export class Application {
  @observable session;
  @observable user;

  static getBrowserInstance(initialData) {
    console.log("Application#getBrowserInstance", initialData);

    const instance = new Application();

    instance.session = Session.getBrowserInstance(initialData.session);
    instance.user = User.getBrowserInstance(instance.session, initialData.user);

    return instance;
  }

  static async getServerInstance(ctx) {
    console.log("Application#getServerInstance");

    const instance = new Application();

    instance.session = await Session.getServerInstance(ctx);
    instance.user = await User.getServerInstance(ctx, instance.session);

    return instance;
  }
}
