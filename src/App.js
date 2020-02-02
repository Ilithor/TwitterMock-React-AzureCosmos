import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// Pages
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { UserPage } from './pages/user';
import { NotificationPage } from './pages/notification';

// Components
import { Navbar } from './components/Navbar';
import { AuthRoute } from './util/AuthRoute';

// Context
import { ContextProvider } from './components/context/ContextProvider';

axios.defaults.baseURL = '/';

export const App = () => (
  <Router>
    <ContextProvider>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={RegisterPage} />
          <AuthRoute path='/notification' component={NotificationPage} />
          <Route exact path='/u/:userHandle' component={UserPage} />
          <Route exact path='/u/:userHandle/post/:postId' component={UserPage} />
        </Switch>
      </div>
    </ContextProvider>
  </Router>
);
