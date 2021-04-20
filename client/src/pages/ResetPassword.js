import React, { useState } from "react";
import Style from "style-it";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/jumbotron';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../graph/index';
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

function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [resetPassword, { data }] = useMutation(RESET_PASSWORD);
  function handleSubmit(e) {
    e.preventDefault();
    if (password1 !== password2) {
      return swalFire('Password do not match!')
    } else {
      if (password1.length < 6) {
        return swalFire('Password length minimum is 6 characters!');
      }
      resetPassword({
        variables: {
          input: {
            email: localStorage.getItem('forgotPasswordEmail'),
            password: password1
          }
        }
      })
      swalOK('Password successfully updated!');
      setPassword1('');
      setPassword2('');
      history.push('/login');
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

      .jumbo {
        padding: 30px;
        margin-top: 80px;
        text-align: center;
        background-color: rgba(229, 241, 242, 0.8);
        height: 45%;
        width: 50%;
        border-radius: 5px;
        color: #fff; 
      }
    `,
    <div className="homeBackground">
      <Jumbotron className="jumbo">
        <h2 style={{ color: '#000' }}>Reset Password</h2>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password2"
            type="password"
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          ><i class="fas fa-check-circle"></i>&nbsp;Confirm
          </Button>
        </form>
      </Jumbotron>
    </div>
  )
}

export default ResetPassword;