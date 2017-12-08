import { Component } from "react";
import Router from "next/router";
import { get, isString, isEmpty } from "lodash";
import { inject, observer } from "mobx-react";

import { Alert, Button, Col, FormGroup, Label } from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";

@inject("application")
@observer
class ErrorMessage extends Component {
  render() {
    // console.log("ErrorMessage#render", this.props);

    const errorMessage = get(this.props, "application.session.errorMessage");

    // console.log("ErrorMessage#render errorMessage", errorMessage);

    if (!isString(errorMessage) || isEmpty(errorMessage)) {
      return null;
    }

    return (
      <FormGroup check row>
        <Col
          sm={{
            size: 10,
            offset: 2
          }}
        >
          {errorMessage}
        </Col>
      </FormGroup>
    );
  }
}

@inject("application")
@observer
class SuccessMessage extends Component {
  render() {
    // console.log("SuccessMessage#render", this.props);

    const successMessage = get(
      this.props,
      "application.session.successMessage"
    );

    // console.log("SuccessMessage#render successMessage", successMessage, isString(successMessage), isEmpty(successMessage));

    if (
      !successMessage ||
      !isString(successMessage) ||
      isEmpty(successMessage)
    ) {
      return null;
    }

    return (
      <FormGroup check row>
        <Col
          sm={{
            size: 10,
            offset: 2
          }}
        >
          {successMessage}
        </Col>
      </FormGroup>
    );
  }
}

@inject("application")
@observer
export class LoginForm extends Component {
  handleValidSubmit = async (event, { email, password }) => {
    // console.log("LoginForm#render", email, password, this.props);

    const session = get(this.props, "application.session");

    await session.loginWithEmailPassword(email, password);

    // await Router.push("/cms");
  };

  render() {
    // console.log("LoginForm#render", this.props);

    const isLoggingIn = get(this.props, "application.session.isLoggingIn");

    return (
      <AvForm onValidSubmit={this.handleValidSubmit}>
        <FormGroup row>
          <Label for="email" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <AvField
              type="email"
              name="email"
              id="email"
              ref={x => {
                this.emailRef = x;
              }}
              autoFocus
              required
              disabled={isLoggingIn}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="password" sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <AvField
              type="password"
              name="password"
              id="password"
              ref={x => {
                this.passwordRef = x;
              }}
              required
              disabled={isLoggingIn}
            />
          </Col>
        </FormGroup>

        <ErrorMessage />
        <SuccessMessage />

        <FormGroup check row>
          <Col
            sm={{
              size: 10,
              offset: 2
            }}
          >
            <Button type="submit" disabled={isLoggingIn}>
              Login
            </Button>
          </Col>
        </FormGroup>
      </AvForm>
    );
  }
}
