/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '../styles/buttons';

import { getDocuments } from '../store';

const DocGrid = ({ documents, getDocuments }) => {
  useEffect(() => {
    getDocuments([]);
  }, [getDocuments]);

  return (
    <>
      <h1>DocGrid</h1>
      <Button type="submit" variant="contained">
        New Document
      </Button>
      <div>
        {documents.map((document) => (
          <div key={document._id}>
            <h1>{document.fileName}</h1>
            <h1>{document.body}</h1>
            <Link to={`/document/${document._id}`}>
              <Button type="submit" variant="contained">
                Open
              </Button>
            </Link>
          </div>
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
