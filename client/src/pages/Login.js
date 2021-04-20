import React, { useState } from "react";
import Style from "style-it";
import Jumbotron from 'react-bootstrap/jumbotron';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TextField from '@material-ui/core/TextField';
import { useHistory, NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graph/index';
import { swalOK, swalFire } from '../styling/swal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 333,
    margin: '0 auto'
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%', // Fix IE 11 issue.
    margin: '0 auto',
    borderColor: '#fff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    color: 'white'
  }
}));

function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const history = useHistory();
  function toRegister(e) {
    e.preventDefault();
    history.push('/register');
  }
  return (
    <BottomNavigation
      value={value}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={toRegister} label="Register" icon={<i class="fas fa-user-plus my-1"></i>} />
      <BottomNavigationAction style={{ border: '1px solid #000' }} label="Login" icon={<i class="fas fa-sign-in-alt my-1"></i>} />
    </BottomNavigation>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const [loggingIn, { data }] = useMutation(LOGIN);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      return swalFire('Input validation', 'All inputs must be filled!');
    }
    const user = await loggingIn({
      variables: {
        input: {
          email,
          password
        }
      }
    })
    if (!user.data.login.message) {
      swalOK('Successfully logged in!');
      setEmail('');
      setPassword('');
      localStorage.setItem('userFullName', user.data.login.full_name);
      localStorage.setItem('userEmail', user.data.login.email);
      history.push('/profile');
    } else {
      swalFire('Message: ', user.data.login.message);
    }
  }
  return Style.it(`
      .homeBackground {
        background-color: rgba(0, 0, 0, 0.7);
        height: 92.5vh;
        display: flex;
        justify-content: center;
      }
      
      .homeBackground::before {
        content: '';
        position: absolute;
        top: 7.5vh;
        left: 0;
        height: 92.5vh;
        width: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('/background.jpeg');
        z-index: -1;
      }

      .link {
        color: '#fff',
        text-decoration: 'none'
      }

      .jumbo {
        padding: 30px;
        margin-top: 80px;
        text-align: center;
        background-color: rgba(229, 241, 242, 0.8);
        height: 55%;
        width: 50%;
        border-radius: 5px;
        color: #fff; 
      }

      .myH1 {
        margin: 20px 0 0;
        font-size: 50px;
      }

      .myP {
        font-size: 25px;
        margin-top: 15px;
      }

      .myButton {
        font-size: 20px;
        margin-top: 10px;
      }

      .myLink {
        color: #fff;
        text-decoration: none;
      }
    `,
    <div className="homeBackground">
      <Jumbotron className="jumbo">
        <SimpleBottomNavigation />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          ><i class="fas fa-sign-in-alt"></i>&nbsp;Login
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgot-password">
                Forgot password?
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </Jumbotron>
    </div>
  )
}

export default Login;