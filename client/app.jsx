import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import history from './history';
import store from './store';
import App from './layout';

import '../public/index.css';

render(
  <Provider store={store}>
    <Router history={history}>
      <Auth0Provider
        domain="xanderbakx.us.auth0.com"
        clientId="Ll0ZztimqK0nfj9roV8JCyccvlES5s7X"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
