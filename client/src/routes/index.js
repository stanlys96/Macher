import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import EmailVerified from '../pages/EmailVerified';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import UserProfile from '../pages/UserProfile';

const routes = [
  {
    id: 1,
    path: "/index",
    component: Home,
    exact: true
  },
  {
    id: 2,
    path: "/login",
    component: Login,
    exact: true
  },
  {
    id: 3,
    path: "/active/:token",
    component: EmailVerified,
    exact: true
  },
  {
    id: 4,
    path: "/register",
    component: Register,
    exact: true
  },
  {
    id: 5,
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true
  },
  {
    id: 6,
    path: "/reset-password",
    component: ResetPassword,
    exact: true
  },
  {
    id: 7,
    path: "/profile",
    component: UserProfile,
    exact: true
  }
]

export default routes;