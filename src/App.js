import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/register';
import user from './pages/user';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// MUI
import deepPurple from '@material-ui/core/colors/deepPurple';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import {
  logoutUserAction,
  getUserDataAction,
} from './redux/actions/userActions';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

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

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={home} />
            <AuthRoute exact path='/login' component={login} />
            <AuthRoute exact path='/signup' component={signup} />
            <Route exact path='/:handle' component={user} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
