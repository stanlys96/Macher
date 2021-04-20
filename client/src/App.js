import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import { HomeRoute, RegisterRoute, LoginRoute, ForgotPasswordRoute } from './routes/index';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerified from './pages/EmailVerified';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Navbar />      
      <Switch>
        <Route exact path="/active/:token">
          <EmailVerified />
        </Route>
        <HomeRoute path="/index" component={Home} />
        <RegisterRoute path="/register" component={Register} />
        <LoginRoute path="/login" component={Login} />
        <ForgotPasswordRoute path="/forgot-password" component={ForgotPassword} />
        <UserProfile exact path="/profile" />
        <ResetPassword exact path="/reset-password" />
      </Switch>
    </Router>
  );
}

export default App;
