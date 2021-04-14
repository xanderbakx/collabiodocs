/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getDocuments } from '../store';

const DocGrid = ({ documents, getDocuments }) => {
  useEffect(() => {
    getDocuments([]);
  }, []);
  return (
    <>
      <h1>DocGrid</h1>
      <div>
        {documents.map((document) => {
          console.log('document', document);
          return (
            <div key={document._id}>
              <h1>{document.fileName}</h1>
              <h1>{document.body}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapState = (state) => ({
  documents: state.documents,
});

const mapDispatch = (dispatch) => ({
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(mapState, mapDispatch)(DocGrid);
