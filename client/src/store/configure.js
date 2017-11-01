import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [];

middleware.push(thunk);

if (typeof window !== 'undefined' && module.hot) {
  middleware.push(logger);
}

export default function configureStore(reducer) {
  return composeWithDevTools(applyMiddleware(...middleware))(createStore)(reducer);
}