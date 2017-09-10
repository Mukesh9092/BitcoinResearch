import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

class Session {
  @observable expires;
  @observable httpOnly;
  @observable originalMaxAge;
  @observable path;
  @observable sameSite;
  @observable secure;
  @observable userId;

  @observable successMessage;
  @observable errorMessage;

  constructor() {
    console.log('Session#constructor')

    this.initializeFromLocalStorage();
  }

  initializeFromLocalStorage = () => {
    console.log('Session#initializeFromLocalStorage')

    if (!process.browser) {
      console.log('Session#initializeFromLocalStorage is not in the browser, skipping')
      return;
    }

    const { localStorage } = window;

    const expires = localStorage.getItem("expires");
    const httpOnly = localStorage.getItem("httpOnly");
    const originalMaxAge = localStorage.getItem("originalMaxAge");
    const path = localStorage.getItem("path");
    const sameSite = localStorage.getItem("sameSite");
    const secure = localStorage.getItem("secure");
    const userId = localStorage.getItem("userId");

    if (expires && httpOnly && originalMaxAge && path && sameSite && secure && userId) {
      this.expires = expires;
      this.httpOnly = httpOnly;
      this.originalMaxAge = originalMaxAge;
      this.path = path;
      this.sameSite = sameSite;
      this.secure = secure;
      this.userId = userId;

      console.log('Session#initializeFromLocalStorage new values', this)
    } else {
      console.log('Session#initializeFromLocalStorage no values found')
    }
  };

  setInLocalStorage = () => {
    console.log('Session#setInLocalStorage')

    if (!process.browser) {
      return;
    }

    const { localStorage } = window;

    localStorage.setItem("expires", this.expires);
    localStorage.setItem("httpOnly", this.httpOnly);
    localStorage.setItem("originalMaxAge", this.originalMaxAge);
    localStorage.setItem("path", this.path);
    localStorage.setItem("sameSite", this.sameSite);
    localStorage.setItem("secure", this.secure);
    localStorage.setItem("userId", this.userId);

    console.log('Session#setInLocalStorage new localstore values')
  };

  removeFromLocalStorage = () => {
    console.log('Session#removeFromLocalStorage')

    if (!process.browser) {
      return;
    }

    const { localStorage } = window;

    localStorage.removeItem("expires");
    localStorage.removeItem("httpOnly");
    localStorage.removeItem("originalMaxAge");
    localStorage.removeItem("path");
    localStorage.removeItem("sameSite");
    localStorage.removeItem("secure");
    localStorage.removeItem("userId");

    console.log('Session#removeFromLocalStorage cleared localStorage')
  };

  loginWithEmailPassword = async (email, password) => {
    console.log('Session#loginWithEmailPassword', email, password)

    this.expires = null;
    this.httpOnly = null;
    this.originalMaxAge = null;
    this.path = null;
    this.sameSite = null;
    this.secure = null;
    this.userId = null;

    console.log('Session#loginWithEmailPassword set this attributes to null')

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

    console.log('Session#loginWithEmailPassword login response', response)

    const { status } = response;

    switch (status) {
      case STATUS_UNAUTHORIZED:
        console.log('Session#loginWithEmailPassword login invalid')

        this.errorMessage = "Invalid email or password";
        break;

      case STATUS_OK:
        console.log('Session#loginWithEmailPassword login ok')

        const json = await response.json();

        console.log('Session#loginWithEmailPassword json', json)

        this.expires = json.cookie.expires;
        this.httpOnly = json.cookie.httpOnly;
        this.originalMaxAge = json.cookie.originalMaxAge;
        this.path = json.cookie.path;
        this.sameSite = json.cookie.sameSite;
        this.secure = json.cookie.secure;
        this.userId = json.passport.user;
        this.successMessage = "Login successful";

        this.setInLocalStorage();
        break;

      case STATUS_INTERNAL_SERVER_ERROR:
      default:
        console.log('Session#loginWithEmailPassword login server error')

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
