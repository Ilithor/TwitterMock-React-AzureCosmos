import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// MUI
import deepPurple from '@material-ui/core/colors/deepPurple';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple,
  },
});

let authenticated;
const token = localStorage.Token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute
                  exact
                  path='/login'
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path='/signup'
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
