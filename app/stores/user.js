import { observable } from "mobx";

class User {
  @observable foo;
}

const store = new User();

if (process.browser) {
  window.userStore = store;
}

export default store;
export { User };
