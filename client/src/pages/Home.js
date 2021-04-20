import React from "react";
import Style from "style-it";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  function toRegister(e) {
    e.preventDefault();
    history.push('/register');
  }
  function toLogin(e) {
    e.preventDefault();
    history.push('/login');
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

      .buttonDiv {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
      }

      .buttonReg {
        margin-right: 20px;
      }
    `,
    <div className="homeBackground">
      <div className="buttonDiv">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="buttonReg"
          onClick={toRegister}
        >
          <i class="fas fa-user-plus"></i>&nbsp;Register
        </Button>
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

export default Home;