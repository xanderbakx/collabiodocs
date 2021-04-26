import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../styles/buttons';

const LoginButton = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const createUser = async () => {
    try {
      await loginWithRedirect();
      const token = await getAccessTokenSilently();
      fetch(`https://localhost:${process.env.PORT}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="contained" type="submit" onClick={createUser}>
      Log In
    </Button>
  );
};

export default LoginButton;
