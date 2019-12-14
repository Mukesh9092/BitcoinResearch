import * as functions from 'firebase-functions'
import ccxt from 'ccxt'

import app from './handlers/app'
import importAssets from './handlers/importAssets'

export const httpApp = functions.https.onRequest(app)

export const pubsubImportAssets = functions.pubsub
  .schedule('0 * * * *')
  //.schedule('* * * * *')
  .onRun(importAssets)
