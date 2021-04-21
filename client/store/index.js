import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allDocuments from './allDocuments';
import singleDocument from './singleDocument';

const reducer = combineReducers({ allDocuments, singleDocument });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })),
);
const store = createStore(reducer, middleware);
console.log('state --->', store.getState());

export default store;
export * from './allDocuments.js';
export * from './singleDocument.js';
