import { Request } from 'express'
import firebaseGlobal from 'firebase'
import { NextPageContext } from 'next'
import React, { createContext, FC, useContext, useEffect } from 'react'
import firebase from './firebase'

export type AuthenticationUser = null | firebase.User

export interface AuthenticationContext {
  user: AuthenticationUser
}

export const signIn = async () => {
  try {
    await firebase
      .auth()
      .signInWithPopup(new firebaseGlobal.auth.GoogleAuthProvider())
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (error) {
    console.error(error)
  }
}

const authenticationContext = createContext<AuthenticationContext>({
  user: null,
})

const useProvideAuthentication = (serverUser?: AuthenticationUser) => {
  // const [user, setUser] = useState<AuthenticationUser>(serverUser || null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (newUser) => {
      if (newUser) {
        // if (user) {
        //   return
        // }

        const token = await newUser.getIdToken()
        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ token }),
        })

        // setUser(newUser)
      } else {
        // if (!user) {
        //   return
        // }

        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin',
        })

        // setUser(null)
      }
    })

    return unsubscribe
  })

  return {
    user: null,
  }
}

export interface ProvideAuthenticationProps {
  children?: React.ReactNode
  authentication: {
    user: AuthenticationUser
  }
}

export const AuthenticationProvider: FC<ProvideAuthenticationProps> = ({
  children,
  authentication,
}) => {
  const value = useProvideAuthentication(authentication.user)

  return (
    <authenticationContext.Provider value={value}>
      {children}
    </authenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationContext => {
  return useContext(authenticationContext)
}

export const authenticationInitialProps = (context: NextPageContext) => {
  const req = context.req as Request
  const user: AuthenticationUser = req?.session?.decodedToken || null
  return { user }
}
