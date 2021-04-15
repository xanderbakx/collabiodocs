import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Header = ({ singleDocument }) => <Title>{singleDocument.fileName}</Title>;

const Title = styled.h1`
  text-align: center;
`;
const mapState = (state) => ({
  singleDocument: state.singleDocument,
});

export default connect(mapState, null)(Header);
