import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';

// Pages
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { UserPage } from './pages/user';
import { NotificationPage } from './pages/notification';
import { SettingPage } from './pages/setting';

// Components
import { Navbar } from './components/Navbar';

// Context
import { ContextProvider } from './components/context/ContextProvider';

axios.defaults.baseURL = '/';

/** Displays the application to the user
 *
 * @type {React.FunctionComponent}
 */
export const App = () => {
  const AppContent = () => (
    <Router>
      <ContextProvider>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={RegisterPage} />
            <Route path='/settings' component={SettingPage} />
            <Route path='/notification' component={NotificationPage} />
            <Route exact path='/u/:userHandle' component={UserPage} />
            <Route
              exact
              path='/u/:userHandle/post/:postId'
              component={UserPage}
            />
          </Switch>
        </div>
      </ContextProvider>
    </Router>
  );
  return (
    <div>
      <Helmet>
        <title>SocMon</title>
        <meta
          name='description'
          content='SocMon is a place to meet and communicate with friends and family. Create posts, then comment and like on what others have posted.'
        />
      </Helmet>
      <AppContent />
    </div>
  );
};
