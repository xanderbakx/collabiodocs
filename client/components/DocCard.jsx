/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import { deleteSingleDocument } from '../store';

const DocCard = ({ document, deleteDoc }) => {
  const handleDelete = () => {
    deleteDoc(document._id);
  };

  return (
    <CardContainer>
      <CloseButton onClick={handleDelete}>
        <Icon color="secondary">cancel</Icon>
      </CloseButton>
      <LinkCard to={`/documents/${document._id}`}>
        <Card key={document._id}>
          <Title>{document.fileName}</Title>
        </Card>
      </LinkCard>
    </CardContainer>
  );
};

const mapDispatch = (dispatch) => ({
  deleteDoc: (id) => dispatch(deleteSingleDocument(id)),
});

export default connect(null, mapDispatch)(DocCard);

const CardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 2px 8px 0px #e3e3e3;
  border-radius: 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const LinkCard = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;

const Title = styled.h2`
  color: black;
  /* text-align: center; */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  color: black;
  background-color: white;
  border: none;
  cursor: pointer;
`;
