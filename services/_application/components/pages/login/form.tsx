import * as React from "react";
import Router from "next/router";
import { Alert, Button, Col, FormGroup, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { get, isString, isEmpty } from "lodash";
import { inject, observer } from "mobx-react";

import { SessionStore } from "../../../stores/session";

interface IErrorMessageProps {
  sessionStore: SessionStore
}

@inject("sessionStore")
@observer
export class ErrorMessage extends React.Component<IErrorMessageProps, any> {
  render() {
    // console.log("ErrorMessage", props);

    const { errorMessage } = this.props.sessionStore;

    // console.log("ErrorMessage#render errorMessage", errorMessage);

    if (!errorMessage) {
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
          <span>{errorMessage}</span>
        </Col>
      </FormGroup>
    );
  }
}

interface ISuccessMessageProps {
  sessionStore: SessionStore
}


@inject("sessionStore")
@observer
export class SuccessMessage extends React.Component<ISuccessMessageProps, any> {
  render() {
    // console.log("SuccessMessage", props);

    const { successMessage } = this.props.sessionStore;

    // console.log("SuccessMessage#render successMessage", successMessage);

    if (!successMessage) {
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
          <span>{successMessage}</span>
        </Col>
      </FormGroup>
    );
  }
}

interface ILoginFormProps {
  sessionStore: SessionStore
}

@inject("sessionStore")
@observer
export class LoginForm extends React.Component<ILoginFormProps, any> {
  handleValidSubmit = async (event: any, props: { email: string, password: string }) => {
    const {
      email,
      password,
    } = props;

    // console.log("handleValidSubmit", email, password, sessionStore.loginWithEmailPassword);

    await this.props.sessionStore.loginWithEmailPassword(email, password);

    // console.log("handleValidSubmit logged in!");

    await Router.push("/cms");
  }

  render () {
    const {
      sessionStore,
    } = this.props;

    // console.log("LoginForm", props);

    const { loggingIn } = this.props.sessionStore;

    // console.log("LoginForm#render loggingIn", loggingIn);

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
              autoFocus
              required
              disabled={loggingIn}
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
              required
              disabled={loggingIn}
            />
          </Col>
        </FormGroup>

        <ErrorMessage sessionStore={sessionStore} />
        <SuccessMessage sessionStore={sessionStore} />

        <FormGroup check row>
          <Col
            sm={{
              size: 10,
              offset: 2
            }}
          >
            <Button type="submit" disabled={loggingIn}>
              Login
            </Button>
          </Col>
        </FormGroup>
      </AvForm>
    );
  }
}
