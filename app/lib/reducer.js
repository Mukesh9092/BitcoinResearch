import { combineReducers } from 'redux'

export function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
  })
}
