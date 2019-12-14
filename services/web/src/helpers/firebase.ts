import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

import publicAccountKey from '../../functions/keys/publicAccountKey.json'

const app = firebase.apps[0] || firebase.initializeApp(publicAccountKey)

export default app
