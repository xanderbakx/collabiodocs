import React from 'react';
// import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom';
import { Signup, Home, Document } from './components';

const Routes = () => (
  <Switch>
    <Route path="/document" component={Document} />
    <Route path="/signup" component={Signup} />
    <Route path="/" component={Home} />
  </Switch>
);

export default withRouter(Routes);
