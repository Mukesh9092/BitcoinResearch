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

const ErrorMessage = inject("sessionStore")(observer((props: IErrorMessageProps) => {
  // console.log("ErrorMessage", props);

  const { errorMessage } = props.sessionStore;

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
}));

interface ISuccessMessageProps {
  sessionStore: SessionStore
}

const SuccessMessage = inject("sessionStore")(observer((props: ISuccessMessageProps) => {
  // console.log("SuccessMessage", props);

  const { successMessage } = props.sessionStore;

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
}));

const handleValidSubmit = (sessionStore: SessionStore) =>
  async (event: React.SyntheticEvent<any>, props: { email: string, password: string }) => {
    const {
      email,
      password,
    } = props;

    console.log("handleValidSubmit", email, password, sessionStore.loginWithEmailPassword);

    await sessionStore.loginWithEmailPassword(email, password);

    console.log("handleValidSubmit logged in!");

    await Router.push("/cms");
  };

interface ILoginFormProps {
  sessionStore: SessionStore
}

export const LoginForm = inject("sessionStore")(observer((props: ILoginFormProps) => {
  const {
    sessionStore,
  } = props;

  console.log("LoginForm", props);

  const { loggingIn } = props.sessionStore;

  console.log("LoginForm#render loggingIn", loggingIn);

  return (
    <AvForm onValidSubmit={handleValidSubmit(sessionStore)}>
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
}));
