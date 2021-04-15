import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from './styles';
import { Login, Logout } from '.';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

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

  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Docs Clone
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
