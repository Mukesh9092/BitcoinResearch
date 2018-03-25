import reduxThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/index';

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

const reduxLoggerMiddleware = createLogger();

const composeEnhancers = isBrowser()
  ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const middleware = composeEnhancers(applyMiddleware(reduxThunkMiddleware, reduxLoggerMiddleware));

const store = createStore(rootReducer, middleware);

export default store;
