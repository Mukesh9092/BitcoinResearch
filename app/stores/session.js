import _ from 'lodash'
import { observable } from 'mobx'

import log from 'loglevel'

class SessionStore {
  @observable userId = null
  @observable email = null
  @observable successMessage = null
  @observable errorMessage = null

  constructor() {
    _.bindAll(this, [
      'loginWithEmailPassword'
    ])
  }

  async loginWithEmailPassword(email, password) {
    console.log('loginWithEmailPassword', email, password)

    try {
      this.userId = null
      this.email = null
      this.successMessage = null
      this.errorMessage = null

      console.log('EMAIL', email)

      const response = await fetch('/api/authentication/local', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      console.log('loginWithEmailPassword response', response)

      const { status } = response

      if (status !== 200) {
        console.log(this)

        this.errorMessage = 'Login failed'
        return
      }

      const headerKeys = response.headers.keys()

      for (const key of headerKeys) {
        console.log('loginWithEmailPassword header', key, response.headers.get(key))
      }

      const {
        responseId,
        responseEmail,
      } = await response.json()

      this.userId = responseId
      this.email = responseEmail
      this.successMessage = 'Login successful'
      this.errorMessage = null
    } catch (error) {
      console.error(error)
    }
  }
}

export default new SessionStore()
export { SessionStore }
