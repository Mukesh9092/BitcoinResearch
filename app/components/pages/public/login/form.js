import React from "react";
import { inject, observer } from "mobx-react";

import { Alert, Button, Col, FormGroup, Label } from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";

@inject("sessionStore")
@observer
export class LoginForm extends React.Component {
  handleValidSubmit = (event, { email, password }) => {
    console.log("##### Handle Valid Submit", this.props);

    this.props.sessionStore.testKey = Math.random();
  };

  handlePlus = () => {
    this.props.sessionStore.plus();
  };

  handleMinus = () => {
    this.props.sessionStore.minus();
  };

  /*
  handleValidSubmit = async (event, { email, password }) => {
    try {
      console.log("LoginForm#handleValidSubmit", email, password);

      console.log(
        "LoginForm#handleValidSubmit before",
        this.props.sessionStore
      );

      await this.props.sessionStore.loginWithEmailPassword(email, password);

      console.log("LoginForm#handleValidSubmit after", this.props.sessionStore);
    } catch (error) {
      console.log("##### ERROR", error);
    }
  };
  */

  renderErrorMessage() {
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

  renderSuccessMessage() {
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

  componentWillReact() {
    console.log("##### Component Will React", this.props);
  }

  render() {
    console.log("##### Form Render", this.props);

    const { errorMessage, successMessage } = this.props.sessionStore;

    return (
      <AvForm onValidSubmit={this.handleValidSubmit}>
        <div>
          TESTKEY: {this.props.sessionStore.testKey}
          <button type="button" onClick={this.handlePlus}>
            +
          </button>
          <button type="button" onClick={this.handleMinus}>
            -
          </button>
        </div>

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

        {this.renderErrorMessage()}
        {this.renderSuccessMessage()}

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
