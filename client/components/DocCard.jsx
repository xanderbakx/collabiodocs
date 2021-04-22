/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import { Button } from '../styles/buttons';
import { deleteSingleDocument } from '../store';

const DocCard = ({ document, deleteDoc }) => {
  const handleDelete = () => {
    deleteDoc(document._id);
  };

  return (
    <>
      <Button onClick={handleDelete}>
        <Icon>cancel</Icon>
      </Button>
      <LinkCard to={`/documents/${document._id}`}>
        <Card key={document._id}>
          <Title>{document.fileName}</Title>
        </Card>
      </LinkCard>
    </>
  );
};

const mapDispatch = (dispatch) => ({
  deleteDoc: (id) => dispatch(deleteSingleDocument(id)),
});

export default connect(null, mapDispatch)(DocCard);

const LinkCard = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div`
  box-sizing: border-box;
  transition: transform 0.2s;
  height: 200px;
  width: 200px;
  margin: 1em;
  border: 1px solid;
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  color: black;
  text-align: center;
`;
