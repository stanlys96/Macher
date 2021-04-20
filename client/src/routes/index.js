import { Route, Redirect } from 'react-router-dom';

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

// const routes = [
//   {
//     id: 1,
//     path: "/index",
//     component: Home,
//     exact: true
//   },
//   {
//     id: 2,
//     path: "/login",
//     component: Login,
//     exact: true
//   },
//   {
//     id: 3,
//     path: "/active/:token",
//     component: EmailVerified,
//     exact: true
//   },
//   {
//     id: 4,
//     path: "/register",
//     component: Register,
//     exact: true
//   },
//   {
//     id: 5,
//     path: "/forgot-password",
//     component: ForgotPassword,
//     exact: true
//   },
//   {
//     id: 6,
//     path: "/reset-password",
//     component: ResetPassword,
//     exact: true
//   },
//   {
//     id: 7,
//     path: "/profile",
//     component: UserProfile,
//     exact: true
//   }
// ]