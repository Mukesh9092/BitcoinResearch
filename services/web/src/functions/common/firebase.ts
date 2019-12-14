import admin from 'firebase-admin'

import serviceAccountKey from '../keys/serviceAccountKey.json'

const app =
  admin.apps[0] ||
  admin.initializeApp({
    databaseURL: `https://${serviceAccountKey.project_id}.firebaseio.com`,
    // @ts-ignore
    credential: admin.credential.cert(serviceAccountKey),
  })

export default app
