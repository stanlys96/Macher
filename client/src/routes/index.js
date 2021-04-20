import { Route, Redirect } from 'react-router-dom';
import EmailVerified from '../pages/EmailVerified';
import ResetPassword from '../pages/ResetPassword';
import UserProfile from '../pages/UserProfile';

export const HomeRoute = ({ component: Home, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('userFullName')
    ? <Home {...props} />
    : <Redirect to='/profile' />
  )} /> 
);

export const RegisterRoute = ({ component: Register, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('userFullName')
    ? <Register {...props} />
    : <Redirect to='/profile' />
  )} /> 
);

export const LoginRoute = ({ component: Login, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('userFullName')
    ? <Login {...props} />
    : <Redirect to='/profile' />
  )} /> 
);

export const ForgotPasswordRoute = ({ component: ForgotPassword, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('userFullName')
    ? <ForgotPassword {...props} />
    : <Redirect to='/profile' />
  )} /> 
);

export const routes = [
  {
    id: 1,
    path: "/active/:token",
    component: EmailVerified,
    exact: true
  },
  {
    id: 2,
    path: "/reset-password",
    component: ResetPassword,
    exact: true
  },
  {
    id: 3,
    path: "/profile",
    component: UserProfile,
    exact: true
  }
]