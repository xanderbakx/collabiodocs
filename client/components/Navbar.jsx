import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../styles/buttons';
import { Login, Logout } from '.';

import { getUser } from '../store';

// eslint-disable-next-line no-shadow
const Navbar = ({ user, getUser }) => {
  useEffect(() => {
    getUser();
  }, [user.id]);
  let links;

  const getLinks = () => {
    links = [
      { id: 1, name: 'Documents', path: '/' },
      { id: 2, name: user.displayName, path: '/profile' },
    ];
  };

  getLinks();

  return (
    <NavbarWrapper>
      <TitleLink to="/">
        <Title>Docs Clone</Title>
      </TitleLink>
      {user.id ? (
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

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapState, mapDispatch)(Navbar);

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
