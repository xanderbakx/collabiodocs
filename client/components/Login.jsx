import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './styles';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      type="submit"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
