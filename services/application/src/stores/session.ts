import Cookies from "js-cookie";
import Router from "next/router";
import { IGetInitialPropsContext } from '../types/next';
import { get } from "lodash";
import { observable, computed } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

export interface ISessionStoreProps {
  userId: string | null;
  isAuthenticated: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  loading: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
}

export class SessionStore {
  @observable userId: string | null = null;
  @observable isAuthenticated: boolean = false;
  @observable loading: boolean = false;
  @observable loggingIn: boolean = false;
  @observable loggingOut: boolean = false;
  @observable successMessage: string | null = null;
  @observable errorMessage: string | null = null;

  constructor(props: ISessionStoreProps | void) {
    // console.log("SessionStore#constructor", props);

    if (props) {
      this.userId = props.userId;
      this.isAuthenticated = props.isAuthenticated;
      this.successMessage = props.successMessage;
      this.errorMessage = props.errorMessage;
      this.loading = props.loading;
      this.loggingIn = props.loggingIn;
      this.loggingOut = props.loggingOut;
    }
  }

  loadFromContext(ctx: IGetInitialPropsContext): void {
    // console.log("SessionStore#loadFromContext");

    if (!ctx.req) {
      this.loadFromLocalStorage();
    } else {
      const passport = get(ctx, ["req", "authentication", "session", "passport"])

      // console.log("SessionStore#loadFromContext passport", passport);

      if (passport) {
        this.userId = passport.user;
        this.isAuthenticated = true;
      }
    }
  }

  loadFromLocalStorage(): void {
    // console.log("SessionStore#loadFromLocalStorage");

    const userId = window.localStorage.getItem("userId");
    
    if (userId) {
      this.userId = userId;
      this.isAuthenticated = true;
    }
  }

  setInLocalStorage(): void {
    // console.log("SessionStore#setInLocalStorage");

    if (this.userId) {
      window.localStorage.setItem("userId", this.userId);
    }
  }

  removeFromLocalStorage(): void {
    // console.log("SessionStore#removeFromLocalStorage");

    window.localStorage.removeItem("userId");
  }

  async loginWithEmailPassword(email: string, password: string): Promise<void> {
    // console.log("SessionStore#loginWithEmailPassword", email, password);

    this.userId = null;
    this.isAuthenticated = false;
    this.successMessage = null;
    this.errorMessage = null;
    this.loggingIn = true;

    const response = await fetch("/api/authentication/local", {
      credentials: "same-origin",
      method: "POST",
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email,
        password
      })
    });

    const { status } = response;

    // console.log("SessionStore#loginWithEmailPassword response", status, response);

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

    await Router.push("/cms");

    this.isAuthenticated = true;
    this.successMessage = "Login successful";
  }

  async logout() {
    // console.log("SessionStore#logout");

    this.userId = null;
    this.isAuthenticated = false;
    this.successMessage = null;
    this.errorMessage = null;
    this.loggingOut = true;

    this.removeFromLocalStorage();

    await fetch("/api/authentication/logout", { credentials: "same-origin" });

    this.successMessage = "Logout successful";

    this.loggingOut = false;

    await Router.push("/");
  }
}

export default new SessionStore(undefined);
