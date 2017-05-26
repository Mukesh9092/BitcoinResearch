import React from 'react'
import { graphql } from 'react-apollo'

import {
  Button,
  Col,
  FormGroup,
  Label,
} from 'reactstrap'

import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation'

import sessionWithEmail from '../../../../graphql/mutations/sessionWithEmail'

@graphql(
  sessionWithEmail,
  {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({
        variables: {
          email,
          password,
        },
      }),
    }),
  },
)
export class LoginForm extends React.Component {
  handleValidSubmit = (event, { email, password }) => {
    console.log('handleValidSubmit', email, password)

    this.props.login(email, password)
  }

  render() {
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        <FormGroup row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <AvField
              type="email"
              name="email"
              id="email"
              ref={(x) => { this.emailRef = x }}
              autoFocus
              required
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <AvField
              type="password"
              name="password"
              id="password"
              ref={(x) => { this.passwordRef = x }}
              required
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </FormGroup>
      </AvForm>
    )
  }
}
