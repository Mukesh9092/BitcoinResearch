import React from "react";
import { inject, observer } from "mobx-react";

import { Alert, Button, Col, FormGroup, Label } from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";

@inject("sessionStore")
@observer
class ErrorMessage extends React.Component {
  render() {
    const { errorMessage } = this.props.sessionStore;

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
          <Alert color="danger">
            {errorMessage}
          </Alert>
        </Col>
      </FormGroup>
    );
  }
}

@inject("sessionStore")
@observer
class SuccessMessage extends React.Component {
  render() {
    const { successMessage } = this.props.sessionStore;

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
          <Alert color="success">
            {successMessage}
          </Alert>
        </Col>
      </FormGroup>
    );
  }
}

@inject("sessionStore")
@observer
export class LoginForm extends React.Component {
  handleValidSubmit = async (event, { email, password }) => {
    try {
      await this.props.sessionStore.loginWithEmailPassword(email, password);
    } catch (error) {
      console.log("##### ERROR", error);
    }
  };

  render() {
    console.log("##### Form Render", this.props);

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

        <ErrorMessage />
        <SuccessMessage />

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
