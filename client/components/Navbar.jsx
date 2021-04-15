import React from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Login, Logout } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Docs Clone
          </Typography>
          <Button type="submit">
            <Link to="/documents">My Documents</Link>
          </Button>
          {isAuthenticated ? (
            <>
              <h3>{`Hi, ${user.name}`}</h3>
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

const mapState = (state) => ({
  isLoggedIn: state.user,
});

export default connect(mapState)(Navbar);
