import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../styles/buttons';

import { removeUser } from '../store';

// eslint-disable-next-line no-shadow
const LogoutButton = ({ removeUser }) => (
  <Button variant="contained" type="submit" onClick={removeUser}>
    Log Out
  </Button>
);

const mapDispatch = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
});

export default connect(null, mapDispatch)(LogoutButton);
