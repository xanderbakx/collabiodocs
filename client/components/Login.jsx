import React from 'react';
import { Button } from '../styles/buttons';

const LoginButton = () => (
  <Button variant="contained" type="submit">
    <a href="/auth/login">Log In</a>
  </Button>
);

export default LoginButton;
