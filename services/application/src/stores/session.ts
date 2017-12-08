import Cookies from "js-cookie";
import Router from "next/router";
import { get } from "lodash";
import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

export class Session {
  @observable userId = null;
  @observable successMessage = null;
  @observable errorMessage = null;
  @observable loading = false;
  @observable loggingIn = false;
  @observable loggingOut = false;

  constructor(initialData) {
    // console.log("Session#constructor", initialData);

    if (initialData) {
      this.userId = initialData.userId;
      this.successMessage = initialData.successMessage;
      this.errorMessage = initialData.errorMessage;
      this.loading = initialData.loading;
      this.isLoggingIn = initialData.isLoggingIn;
    }
  }

  static getBrowserInstance(initialData) {
    // console.log("Session#getBrowserInstance");

    const instance = new Session(initialData);
    const userId = window.localStorage.getItem("userId");

    if (userId) {
      instance.userId = userId;
    }

    return instance;
  }

  static async getServerInstance(ctx) {
    // console.log("Session#getServerInstance");

    const instance = new Session();

    const userId = get(ctx.req, "session.passport.user");

    if (userId) {
      instance.userId = userId;
    }

    return instance;
  }

  async setInLocalStorage() {
    // console.log("Session#setInLocalStorage", this.userId);

    window.localStorage.setItem("userId", this.userId);
  }

  async removeFromLocalStorage() {
    // console.log("Session#removeFromLocalStorage");

    window.localStorage.removeItem("userId");
  }

  async loginWithEmailPassword(email, password) {
    // console.log("Session#loginWithEmailPassword", email, password);

    this.userId = null;
    this.successMessage = null;
    this.errorMessage = null;
    this.isLoggingIn = true;

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

    // console.log("Session#loginWithEmailPassword response", status, response);

    this.isLoggingIn = false;

    if (status === STATUS_INTERNAL_SERVER_ERROR) {
      this.errorMessage = "Server Error";
      return;
    }

    if (status === STATUS_UNAUTHORIZED) {
      this.errorMessage = "Invalid email or password";
      return;
    }

    const json = await response.json();
    this.userId = json.passport.user;
    this.setInLocalStorage();
    this.successMessage = "Login successful";

    await Router.push("/cms");

    // Just skip these, immediately redirect.
  }

  async logout() {
    console.log("Session#logout");

    this.loggingOut = true;

    await this.removeFromLocalStorage();

    await fetch("/api/authentication/logout", { credentials: "same-origin" });

    this.userId = null;
    this.successMessage = null;
    this.errorMessage = null;

    this.loggingOut = false;

    await Router.push("/");
  }

  isAuthenticated = () => {
    return !!this.userId;
  };
}
