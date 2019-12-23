import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import React from 'react'
import useForm from 'react-hook-form'
import { useSigninMutation } from '../common/graphql/generated/service-api/apollo-client'

const Component = () => {
  const { handleSubmit, register, errors, getValues } = useForm()

  const [signinMutation, { data, loading, error }] = useSigninMutation()

  const onSubmit = () => {
    const { username, password } = getValues()

    signinMutation({
      variables: {
        username,
        password,
      }
    })
  }

  let usernameHelperText = ''
  let passwordHelperText = ''

  if (errors.username?.type === 'required') {
    usernameHelperText = 'Field is required'
  }

  if (errors.password?.type === 'required') {
    passwordHelperText = 'Field is required'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        label='Username'
        labelFor='username-input'
        helperText={usernameHelperText}
        intent={errors.username ? 'danger' : 'none'}
      >
        <InputGroup
          id='username-input'
          type='text'
          name='username'
          autoFocus={true}
          intent={errors.username ? 'danger' : 'none'}
          inputRef={register({
            required: true,
          })}
        />
      </FormGroup>

      <FormGroup
        label='Password'
        labelFor='password-input'
        helperText={passwordHelperText}
        intent={errors.password ? 'danger' : 'none'}
      >
        <InputGroup
          id='password-input'
          type='password'
          name='password'
          intent={errors.password ? 'danger' : 'none'}
          inputRef={register({
            required: true,
          })}
        />
      </FormGroup>
      <Button icon='log-in' type='submit' loading={loading}>
        Sign In
      </Button>
    </form>
  )
}

export default Component
