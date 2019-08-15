import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router';
import Login from './pages/Login-page/login';
import Home from './pages/Home-page/home';
import { AuthService } from './utils/auth-service';
const routes: Array<any> = [
  {
    path: '/',
    component: Login,
    exact: true,
    state: {protected: false}
  },
  {
    path: '/media/*',
    component: Home,
    exact: true,
    state: {protected: true}
  }
]

class App extends Component {
  render() {
    return (
      <Fragment>
          <Switch>
            {routes.map((route, index) => (
              !route.state.protected ?
                 <Route key={index} exact={route.exact} path={route.path} component={route.component}></Route>
                 :
              <ProtectedRoute key={index} component={route.component} exact={route.exact} path={route.path}></ProtectedRoute>
            ))}
          </Switch>
          </Fragment>
    );
  }
}

export const ProtectedRoute = ({component, ...rest}: any) => {
  return (<Route {...rest}  render={
    (props) => {
      if(AuthService.Instance.token != "") {
return React.createElement(component, props)
      } else {
        return <Redirect to="/"></Redirect>
      }
      
    } 
  }></Route>);
}

export default App;
