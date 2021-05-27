import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

const Profile = ({ user }) => user.id && (
<div>
  <Helmet>
    <title>{user.displayName}</title>
  </Helmet>
  <img src={user.picture} alt={user.displayName} />
  <h2>{user.displayName}</h2>
</div>
);

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(Profile);
