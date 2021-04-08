import React from 'react';
// import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom';
import {
  Signup, Home, Document, Profile,
} from './components';

const Routes = () => (
  <Switch>
    <Route path="/document" component={Document} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/" component={Home} />
  </Switch>
);

export default withRouter(Routes);
