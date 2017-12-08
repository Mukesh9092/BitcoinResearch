import Cookies from "js-cookie";
import Router from "next/router";
import { get } from "lodash";
import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

export interface ISession {
  userId: string;
  successMessage: string;
  errorMessage: string;
  loading: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
}

export class Session implements ISession {
  @observable userId: string;
  @observable successMessage: string;
  @observable errorMessage: string;
  @observable loading: boolean;
  @observable loggingIn: boolean;
  @observable loggingOut: boolean;

  constructor(initialData: ISession | undefined) {
    // console.log("Session#constructor", initialData);

    if (initialData) {
      this.userId = initialData.userId;
      this.successMessage = initialData.successMessage;
      this.errorMessage = initialData.errorMessage;
      this.loading = initialData.loading;
      this.loggingIn = initialData.loggingIn;
      this.loggingOut = initialData.loggingOut;
    }
  }

  static getBrowserInstance(initialData: ISession): Session {
    // console.log("Session#getBrowserInstance");

    const instance = new Session(initialData);
    const userId = window.localStorage.getItem("userId");

    if (userId) {
      instance.userId = userId;
    }

    return instance;
  }

  static async getServerInstance(ctx): Promise<Session> {
    console.log("Session#getServerInstance", ctx);

    const instance = new Session();

    const userId = get(ctx.req, "session.passport.user");

    if (userId) {
      instance.userId = userId;
    }

    return instance;
  }

  setInLocalStorage(): void {
    // console.log("Session#setInLocalStorage", this.userId);

    window.localStorage.setItem("userId", this.userId);
  }

  removeFromLocalStorage(): void {
    // console.log("Session#removeFromLocalStorage");

    window.localStorage.removeItem("userId");
  }

  async loginWithEmailPassword(email: string, password: string): Promise<void> {
    // console.log("Session#loginWithEmailPassword", email, password);

    this.userId = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = false;
    this.loggingIn = true;
    this.loggingOut = false;

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

    this.loggingIn = false;

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

    this.removeFromLocalStorage();

    await fetch("/api/authentication/logout", { credentials: "same-origin" });

    this.userId = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = false;
    this.loggingIn = false;
    this.loggingOut = false;

    await Router.push("/");
  }

  isAuthenticated = () => {
    return !!this.userId;
  };
}
