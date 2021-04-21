/* eslint-disable no-shadow */
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createSingleDocument, getDocuments } from '../store';
import { Button } from '../styles/buttons';

const NewDoc = ({ newDoc, getDocuments }) => {
  const { register, handleSubmit } = useForm();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'hello' }],
    },
  ];

  const onSubmit = (data) => {
    newDoc({
      fileName: data.fileName,
      userId: 1234545,
      body: JSON.stringify(initialValue),
    });
    getDocuments();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fileName">
          Document Name
          <input
            name="fileName"
            id="fileName"
            type="text"
            {...register('fileName')}
          />
        </label>
        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

// const mapState = (state) => ({
//   document: state.singleDocument,
// })

const mapDispatch = (dispatch) => ({
  newDoc: (document) => dispatch(createSingleDocument(document)),
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(null, mapDispatch)(NewDoc);
