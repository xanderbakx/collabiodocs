import React from 'react';
// import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom';
import { Document, Profile, DocGrid } from './components';

const Routes = () => (
  <Switch>
    <Route path="/profile" component={Profile} />
    <Route path="/documents/:id" component={Document} />
    <Route path="/" component={DocGrid} />
  </Switch>
);

export default withRouter(Routes);
