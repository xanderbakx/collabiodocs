import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
      </div>
    )
  );
};

export default Profile;
