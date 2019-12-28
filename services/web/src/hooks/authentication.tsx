import Router from 'next/router'
import { createContext, FC, useContext, useState } from 'react'

export interface AuthenticationUser {
  id: string
}

export interface AuthenticationState {
  isAuthenticated: boolean
  user: null | AuthenticationUser
}

export interface AuthenticationContext {
  isAuthenticated: boolean
  user: null | AuthenticationUser
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const authenticationContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  user: null,
  signIn: async (username: string, password: string) => { },
  signOut: async () => { }
})

interface AuthenticationProviderProps {
  value: AuthenticationState
}

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children,
  value,
}) => {
  const authentication = useProvideAuthentication(value)

  return (
    <authenticationContext.Provider value={authentication}>
      {children}
    </authenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  return useContext(authenticationContext)
}

export const useProvideAuthentication = (value: AuthenticationState) => {
  const [state, setState] = useState<AuthenticationState>(value)

  const signIn = async (username: string, password: string) => {
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

    const body = await result.json()

    if (body.userId) {
      setState({
        isAuthenticated: true,
        user: {
          id: body.userId,
        },
      })

      await Router.push('/dashboard')
    } else {
      // TODO: use body.message ?

      setState({
        isAuthenticated: false,
        user: null,
      })
    }
  }

  const signOut = async () => {
    await fetch('/api/signout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    setState({
      isAuthenticated: false,
      user: null,
    })

    Router.push('/')
  }

  return {
    ...state,
    signIn,
    signOut,
  }
}
