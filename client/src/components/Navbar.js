import React, { Link, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Style from "style-it";
import { toastSuccess } from '../styling/swal';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '7.5vh'
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  navWidth: {
    minWidth: 1200,
    margin: '0 auto'
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userFullName, setUserFullName] = useState(localStorage.getItem('userFullName'));
  const user = useSelector(state => state.user.user);
  function toHome(e) {
    e.preventDefault();
    history.push('/index');
  }
  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    history.push('/index');
    toastSuccess('Successfully logged out!');
    dispatch(setUser({ isLoggedIn: false }));
  }
  useEffect(() => {
    setUserFullName(localStorage.getItem('userFullName'));
  }, [localStorage.getItem('userFullName')])
  return Style.it(`
      .myLink {
        color: #fff;
        text-decoration: none;
      }
      
      .myLink::hover {
        text-decoration: none;
        color: #fff;
      }
    `,
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navWidth}>
          <Typography variant="h6" className={classes.title} onClick={toHome}>
            <i class="fas fa-laugh-beam"></i> Paradise Contriver
          </Typography>
          {userFullName && <Button color="inherit" onClick={logout}><i class="fas fa-sign-out-alt mr-2"></i> Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;