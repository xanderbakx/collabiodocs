import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from './styles';
import { Login, Logout } from '.';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  let links;

  const getLinks = () => {
    links = [
      { id: 1, name: 'Documents', path: '/documents' },
      { id: 2, name: `${user.name}`, path: '/profile' },
    ];
  };

  // TODO: IS THIS HACKY?
  if (isAuthenticated) getLinks();

  return (
    <NavbarWrapper>
      <Title>Docs Clone</Title>
      {isAuthenticated ? (
        <>
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              exact
              activeClassName="current"
            >
              <Button>{link.name}</Button>
            </NavLink>
          ))}
          <Logout />
        </>
      ) : (
        <Login />
      )}
    </NavbarWrapper>
  );
};

export default Navbar;

const Title = styled.h1`
  color: white;
  margin-right: auto;
  font-size: 150%;
  padding: 12px 16px;
`;
const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: rebeccapurple;
  color: white;
  font-family: Helvetica;
  font-weight: 300;
`;
