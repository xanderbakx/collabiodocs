import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../styles/buttons';
import { Login, Logout } from '.';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  let links;

  const getLinks = () => {
    links = [
      { id: 1, name: 'Documents', path: '/' },
      { id: 2, name: `${user.name}`, path: '/profile' },
    ];
  };

  // TODO: IS THIS HACKY?
  if (isAuthenticated) getLinks();

  return (
    <NavbarWrapper>
      <TitleLink to="/">
        <Title>Docs Clone</Title>
      </TitleLink>
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

const TitleLink = styled(Link)`
  text-decoration: none;
  margin-right: auto;
`;

const Title = styled.h1`
  color: white;
  font-size: 150%;
  padding: 12px 16px;
`;
const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: rebeccapurple;
  color: white;
  font-family: Helvetica;
  font-weight: 300;
`;
