import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import { HomeRoute, RegisterRoute, LoginRoute, ForgotPasswordRoute, routes } from './routes/index';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />      
      <Switch>
        <HomeRoute path="/index" component={Home} />
        <RegisterRoute path="/register" component={Register} />
        <LoginRoute path="/login" component={Login} />
        <ForgotPasswordRoute path="/forgot-password" component={ForgotPassword} />
        {
          routes.map((route, i) => (
            <Route
              key={route.id}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))
        }
      </Switch>
    </Router>
  );
}

export default App;
