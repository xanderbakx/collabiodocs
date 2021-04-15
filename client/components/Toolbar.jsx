import React from 'react';
import styled from 'styled-components';

const Toolbar = () => (
  <>
    <ToolbarWrapper />
  </>
);

export default Toolbar;

const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: blue;
  color: white;
  font-family: Helvetica;
  font-weight: 300;
`;
