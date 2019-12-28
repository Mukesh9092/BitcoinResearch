import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthentication } from '../hooks/authentication'

interface State {
  userId?: string
  message?: string
}

const Component: FC = () => {
  const authentication = useAuthentication()
  const { handleSubmit, register, errors, getValues } = useForm()

  const [state, setState] = useState<State>({})

  // const [signinMutation, { data, loading, error }] = useSigninMutation()

  const onSubmit = async () => {
    try {
      const { username, password } = getValues()

      await authentication.signIn(username, password)
    } catch (error) {
      console.error(error)
    }
  }

  let usernameHelperText = ''
  let passwordHelperText = ''

  // @ts-ignore
  if (errors.username?.type === 'required') {
    usernameHelperText = 'Field is required'
  }

  // @ts-ignore
  if (errors.password?.type === 'required') {
    passwordHelperText = 'Field is required'
  }

  return (
    <form
      // method="POST"
      // action="/signin"
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.message ? <div><span>{state.message}</span></div> : null}
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
      <Button icon='log-in' type='submit'>
        Sign In
      </Button>
    </form>
  )
}

export default Component
