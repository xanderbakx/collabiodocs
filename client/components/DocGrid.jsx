/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '../styles/buttons';
import DocCard from './DocCard';
import NewDoc from './NewDoc';

import { getDocuments } from '../store';

const DocGrid = ({ documents, getDocuments }) => {
  // const {
  //   user,
  //   isAuthenticated,
  //   isLoading,
  //   getAccessTokenSilently,
  // } = useAuth0();

  // const getUser = () => {
  //   getAccessTokenSilently().then((token) => {
  //     console.log(token);
  //     console.log(process.env.PORT);
  //     fetch(`https://localhost:${process.env.PORT}/api/documents`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((jsonUser) => console.log('json user --->', jsonUser));
  //   });
  // };

  useEffect(() => {
    // if (isAuthenticated) {
    //   console.log(isAuthenticated)
    //   getUser()
    // }
    getDocuments();
  }, []);

  const [overlay, setOverlay] = useState(false);

  const handleNewDoc = () => {
    setOverlay(!overlay);
  };

  return (
    <>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      <h1>DocGrid</h1>
      <Button onClick={handleNewDoc} type="submit" variant="contained">
        {overlay ? 'Cancel' : 'New Document'}
      </Button>
      {overlay ? <NewDoc /> : ''}
      <div>
        {documents.map((document) => (
          <DocCard document={document} key={document._id} />
        ))}
      </div>
    </>
  );
};

const mapState = (state) => ({
  documents: state.allDocuments,
});

const mapDispatch = (dispatch) => ({
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(mapState, mapDispatch)(DocGrid);
