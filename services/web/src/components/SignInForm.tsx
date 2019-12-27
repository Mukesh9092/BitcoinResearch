import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import Router from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface State {
  userId?: string
  message?: string
}

const Component = () => {
  const { handleSubmit, register, errors, getValues } = useForm()

  const [state, setState] = useState<State>({})

  // const [signinMutation, { data, loading, error }] = useSigninMutation()

  const onSubmit = async () => {
    try {
      const { username, password } = getValues()
      const result = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          password,
        }),
      })
      console.log('result', result)
      const body = await result.json()
      console.log('body', body)

      if (body.userId) {
        await Router.push('/dashboard')
      } else {
        setState({
          message: body.message
        })
      }
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
