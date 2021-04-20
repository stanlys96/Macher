import React, { useEffect, useState } from "react";
import Style from "style-it";
import Jumbotron from 'react-bootstrap/jumbotron';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { swalOK, swalFire } from '../styling/swal';
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER, GET_USERS } from '../graph/index';
import { validateInput } from '../helpers/inputValidation';

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
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  function toLogin(e) {
    e.preventDefault();
    history.push('/login');
  }
  return (
    <BottomNavigation
      value={value}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{ border: '1px solid #000' }} label="Register" icon={<i class="fas fa-user-plus my-1"></i>} />
      <BottomNavigationAction onClick={toLogin} label="Login" icon={<i class="fas fa-sign-in-alt my-1"></i>} />
    </BottomNavigation>
  );
}

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const [registering, { data }] = useMutation(REGISTER);
  const { loading, error, data: userData } = useQuery(GET_USERS);
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validateInput(fullName, email, password);
    if (validate === "fill_input") {
      swalFire('Input validation', 'All inputs must be filled!')
    } else if (validate === 'password_length') {
      swalFire('Input validation', 'Password length minimum is 6 characters!')
    } else if (validate === 'email_validation') {
      swalFire('Input validation', 'Invalid email format!')
    } else {
      let found = false;
      userData.getUsers.forEach(data => {
        if (data.email == email) {
          found = true;
          swalFire('Input validation', 'Email address is already taken!')
        }
      })
      if (!found) {
        registering({
          variables: {
            input: {
              full_name: fullName,
              email,
              password
            }
          }, refetchQueries: [{ query: GET_USERS }]
        })
        setFullName('');
        setEmail('');
        setPassword('');
        swalOK('Check your email for verification!');
        history.push('/login');
      }
    }
  }
  useEffect(() => {
    console.log(userData);
  }, [userData])
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
            id="full_name"
            label="Full Name"
            name="full_name"
            autoComplete="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          ><i class="fas fa-user-plus"></i>&nbsp;Register
          </Button>
        </form>
      </Jumbotron>
    </div>
  )
}

export default Register;