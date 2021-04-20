import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import routes from './routes/index';
const GuardedRoute = ({ component: Home, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('userFullName')
    ? <Home {...props} />
    : <Redirect to='/profile' />
  )} /> 
)

function App() {
  return (
    <Router>
      <Navbar />      
      <Switch>
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
