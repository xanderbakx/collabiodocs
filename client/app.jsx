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
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.SPA_CLIENT_ID}
        redirectUri={window.location.origin}
        audience="https://api/docs"
      >
        <App />
      </Auth0Provider>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
