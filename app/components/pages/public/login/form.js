import React from "react";
import { inject, observer } from "mobx-react";

import { Alert, Button, Col, FormGroup, Label } from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";

@inject("sessionStore")
@observer
export class LoginForm extends React.Component {
  handleValidSubmit = (event, { email, password }) => {
    console.log("LoginForm#handleValidSubmit", email, password);

    console.log("LoginForm#handleValidSubmit before", this.props.sessionStore);

    this.props.sessionStore.loginWithEmailPassword(email, password);

    console.log("LoginForm#handleValidSubmit after", this.props.sessionStore);
  };

  render() {
    const { errorMessage, successMessage } = this.props.sessionStore;

    let errorMessageComponent;
    let successMessageComponent;

    if (errorMessage) {
      errorMessageComponent = (
        <FormGroup check row>
          <Col
            sm={{
              size: 10,
              offset: 2
            }}
          >
            <Alert color="danger">
              {errorMessage}
            </Alert>
          </Col>
        </FormGroup>
      );
    }

    if (successMessage) {
      successMessageComponent = (
        <FormGroup check row>
          <Col
            sm={{
              size: 10,
              offset: 2
            }}
          >
            <Alert color="success">
              {successMessage}
            </Alert>
          </Col>
        </FormGroup>
      );
    }

    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
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
            />
          </Col>
        </FormGroup>

        {errorMessageComponent}
        {successMessageComponent}

        <FormGroup check row>
          <Col
            sm={{
              size: 10,
              offset: 2
            }}
          >
            <Button type="submit">Login</Button>
          </Col>
        </FormGroup>
      </AvForm>
    );
  }
}
