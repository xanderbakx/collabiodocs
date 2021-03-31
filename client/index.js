import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
// import store from './store';
import App from './app';

// import '../public/index.css';

render(
  // <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>,
  // </Provider>,
  document.getElementById('app'),
);
