import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

class Session {
  @observable userId;
  @observable email;
  @observable successMessage;
  @observable errorMessage;

  constructor() {
    this.initializeFromLocalStorage();
  }

  initializeFromLocalStorage = () => {
    if (!process.browser) {
      return;
    }

    const { localStorage } = window;

    this.userId = localStorage.getItem("userId");
    this.email = localStorage.getItem("email");
  };

  setInLocalStorage = () => {
    if (!process.browser) {
      return;
    }

    const { localStorage } = window;

    localStorage.setItem("userId", this.userId);
    localStorage.setItem("email", this.email);
  };

  clearLocalStorage = () => {
    if (!process.browser) {
      return;
    }

    const { localStorage } = window;

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  };

  loginWithEmailPassword = async (email, password) => {
    this.userId = null;
    this.email = null;
    this.successMessage = null;
    this.errorMessage = null;

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
        const { responseId, responseEmail } = await response.json();

        this.userId = responseId;
        this.email = responseEmail;
        this.successMessage = "Login successful";

        this.setInLocalStorage();
        break;

      case STATUS_INTERNAL_SERVER_ERROR:
      default:
        this.errorMessage = "Server Error";
        break;
    }
  };
}

const store = new Session();

if (process.browser) {
  window.sessionStore = store;
}

export default store;
export { Session };
