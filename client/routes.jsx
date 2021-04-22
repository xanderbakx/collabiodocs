import React from 'react';
// import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom';
import {
  Home, Document, Profile, DocGrid,
} from './components';

const Routes = () => (
  <Switch>
    <Route path="/documents/:id" component={Document} />
    <Route path="/documents" component={DocGrid} />
    <Route path="/profile" component={Profile} />
    <Route path="/" component={Home} />
  </Switch>
);

export default withRouter(Routes);
