/* eslint-disable no-shadow */
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import { createSingleDocument, getDocuments } from '../store';
import { Button } from '../styles/buttons';

const NewDoc = ({ newDoc, getDocuments }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { register, handleSubmit, reset } = useForm();

  const getUser = () => {
    getAccessTokenSilently().then((token) => {
      console.log('access token', token);
      fetch(`https://localhost:${process.env.PORT}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((jsonUser) => console.log('json user --->', jsonUser));
    });
  };

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  const onSubmit = (data) => {
    if (isAuthenticated) {
      getUser();
      newDoc({
        userId: user.sub,
        fileName: data.fileName,
        email: user.email,
        name: user.name,
        body: JSON.stringify(initialValue),
      });
    }
    reset();
    getDocuments();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="fileName">
          <Input
            name="fileName"
            id="fileName"
            type="text"
            placeholder="Document name"
            {...register('fileName')}
          />
        </Label>
        <CreateButton type="submit">Create</CreateButton>
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

const Label = styled.label`
  margin-left: 1rem;
`;
const Input = styled.input`
  height: 33px;
  margin-left: 1rem;
  margin-top: 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid lightgray;
  &:focus {
    outline: none;
  }
`;
const CreateButton = styled(Button)`
  background-color: darkseagreen;
  border-radius: 0.2rem;
  &:hover {
    background-color: #b1cab1;
  }
`;
