import React, { useEffect } from "react";
import Style from "style-it";
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VERIFY_EMAIL } from '../graph/index';

function EmailVerified() {
  const history = useHistory();
  const { token } = useParams();
  const { loading, error, data } = useQuery(VERIFY_EMAIL, {
    variables: {
      input: token
    } 
  })
  function toLogin(e) {
    e.preventDefault();
    history.push('/login');
  }
  useEffect(() => {
    console.log(data, "<<< data");
  }, [data]);
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

      .buttonDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
      }

      .buttonReg {
        margin-right: 20px;
      }

      .paragraph {
        color: #fff;
        display: block;
      }
    `,
    <div className="homeBackground">
      <div className="buttonDiv">
        <p className="paragraph">Email verification successful! You can now login!</p>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="buttonLog"
          onClick={toLogin}
        ><i class="fas fa-sign-in-alt"></i>&nbsp;Login
        </Button>
      </div>
    </div>
  )
}

export default EmailVerified;