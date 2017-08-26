import _ from "lodash";
import { observable } from "mobx";

const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

class SessionStore {
  @observable userId = null;
  @observable email = null;
  @observable successMessage = null;
  @observable errorMessage = null;

  constructor() {
    _.bindAll(this, ["loginWithEmailPassword"]);
  }

  async loginWithEmailPassword(email, password) {
    debugger;

    console.log("SessionStore loginWithEmailPassword", email, password);

    this.userId = null;
    this.email = null;
    this.successMessage = null;
    this.errorMessage = null;

    console.log("EMAIL", email);

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

    console.log("SessionStore loginWithEmailPassword response", response);

    const { status } = response;

    debugger;

    switch (status) {
      case STATUS_UNAUTHORIZED:
        this.errorMessage = "Invalid email or password";
        break;

      case STATUS_OK:
        const { responseId, responseEmail } = await response.json();

        this.userId = responseId;
        this.email = responseEmail;
        this.successMessage = "Login successful";
        break;

      case STATUS_INTERNAL_SERVER_ERROR:
      default:
        this.errorMessage = "Server Error";
        break;
    }
  }
}

export default new SessionStore();
export { SessionStore };
