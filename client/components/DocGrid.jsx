/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button } from '../styles/buttons';
import DocCard from './DocCard';
import NewDoc from './NewDoc';

import { getDocuments } from '../store';

const DocGrid = ({ documents, getDocuments }) => {
  console.log('documents -->', documents);
  useEffect(() => {
    getDocuments();
  }, []);

  const [overlay, setOverlay] = useState(false);

  const handleNewDoc = () => {
    setOverlay(true);
  };

  return (
    <>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      <h1>DocGrid</h1>
      <Button onClick={handleNewDoc} type="submit" variant="contained">
        New Document
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
