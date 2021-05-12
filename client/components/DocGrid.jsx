/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import { Button } from '../styles/buttons';
import DocCard from './DocCard';
import NewDoc from './NewDoc';

import { getDocuments } from '../store';

const DocGrid = ({ documents, getDocuments }) => {
  const {
    isAuthenticated,
    // getAccessTokenSilently,
  } = useAuth0();

  // const getUser = () => {
  //   getAccessTokenSilently().then((token) => {
  //     console.log('access token', token);
  //     fetch(`https://localhost:${process.env.PORT}/api/users`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((jsonUser) => console.log('json user --->', jsonUser));
  //   });
  // };

  useEffect(() => {
    if (isAuthenticated) {
      // getUser()
      getDocuments();
    }
  }, [isAuthenticated]);

  const [overlay, setOverlay] = useState(false);

  const handleNewDoc = () => {
    setOverlay(!overlay);
  };

  return (
    <>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      {isAuthenticated ? (
        <>
          <h1 className="title">DocGrid</h1>
          <NewDocButton
            onClick={handleNewDoc}
            type="submit"
            variant="contained"
          >
            {overlay ? 'Cancel' : 'New Document'}
          </NewDocButton>
          {/* <Button type="submit" onClick={getUser}>Get User</Button> */}
          {overlay ? <NewDoc /> : ''}
          {documents.length ? (
            <GridContainer>
              {documents.map((document) => (
                <DocCard document={document} key={document._id} />
              ))}
            </GridContainer>
          ) : (
            <div>
              <h1 className="title">No documents yet...</h1>
            </div>
          )}
        </>
      ) : (
        <div />
      )}
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 12rem));
  grid-template-rows: fit-content;
  justify-content: start;
  gap: 2rem;
  margin: 2rem;
`;

const NewDocButton = styled(Button)`
  margin-left: 2rem;
  background-color: rebeccapurple;
  color: white;
  border-radius: 0.2rem;
  &:hover {
    background-color: #7c6594;
    color: white;
  }
`;
