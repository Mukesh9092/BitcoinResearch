import { get } from "lodash";
import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

class Session {
  @observable userId;

  @observable successMessage;
  @observable errorMessage;

  @observable loaded;

  constructor() {
    if (process.browser) {
      this.loadFromBrowser();
    } else {
      this.loadFromServer();
    }
  }

  async loadFromServer(req) {
    const userId = get(req, "session.passport.user");

    console.log('Session#loadFromServer userId', userId)

    if (userId) {
      console.log('Session#loadFromServer setting userId')

      this.userId = userId;
    }

    this.loaded = true;
  };

  async loadFromBrowser() {
    const { localStorage } = window;

    const userId = localStorage.getItem("userId");

    console.log('Session#loadFromBrowser userId', userId)

    if (userId) {
      console.log('Session#loadFromBrowser setting userId')

      this.userId = userId;
    }

    this.loaded = true
  };

  async setInLocalStorage() {
    const { localStorage } = window;

    localStorage.setItem("userId", this.userId);
  };

  async removeFromLocalStorage() {
    const { localStorage } = window;

    localStorage.removeItem("userId");
  };

  async loginWithEmailPassword(email, password) {
    this.userId = null;

    const response = await fetch("/api/authentication/local", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    });

    const { status } = response;

    switch (status) {
      case STATUS_UNAUTHORIZED:
        this.errorMessage = "Invalid email or password";
        break;

      case STATUS_OK:
        const json = await response.json();

        this.userId = json.passport.user;
        this.successMessage = "Login successful";

        this.setInLocalStorage();
        break;

      case STATUS_INTERNAL_SERVER_ERROR:
      default:
        this.errorMessage = "Server Error";
        break;
    }
  };

  isAuthenticated = () => {
    return !!this.userId;
  }
}

const store = new Session();

if (process.browser) {
  window.sessionStore = store;
}

export default store;
export { Session };
