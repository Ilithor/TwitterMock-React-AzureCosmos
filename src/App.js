import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Pages
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { UserPage } from './pages/user';
import { NotificationPage } from './pages/notification';

// Components
import { Navbar } from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Redux
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import {
  logoutUserAction,
  getUserDataAction,
} from './redux/actions/userActions';

// Context
import { ContextProvider } from './components/context/ContextProvider';

axios.defaults.baseURL = '/';
const token = localStorage.Token;
const handle = localStorage.Handle;
if (token && handle) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUserAction());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserDataAction(handle));
  }
}

export const App = () => (
  <ContextProvider>
    <Router>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={RegisterPage} />
          <AuthRoute path='/notification' component={NotificationPage} />
          <Route exact path='/u/:handle' component={UserPage} />
          <Route exact path='/u/:handle/post/:postId' component={UserPage} />
        </Switch>
      </div>
    </Router>
  </ContextProvider>
);
