import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allDocuments from './allDocuments';
import singleDocument from './singleDocument';
import user from './user';

const reducer = combineReducers({ allDocuments, singleDocument, user });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })),
);
const store = createStore(reducer, middleware);

export default store;
export * from './allDocuments.js';
export * from './singleDocument.js';
export * from './user.js';
