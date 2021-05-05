import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const getUser = () => {
    getAccessTokenSilently().then((token) => {
      console.log(token);
      console.log(process.env.PORT);
      fetch(`https://localhost:${process.env.PORT}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((jsonUser) => console.log('json user --->', jsonUser));
    });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Helmet>
          <title>{user.name}</title>
        </Helmet>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button type="submit" onClick={getUser}>
          Click
        </button>
      </div>
    )
  );
};

export default Profile;
