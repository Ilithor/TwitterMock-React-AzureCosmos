import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { colors, createMuiTheme } from '@material-ui/core';
import store from '../../redux/store';
import { Provider } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: colors.deepPurple,
    secondary: colors.deepPurple,
  },
});

/** This is a component you can wrap stuff in your tests with so
 * you don't have to declare the same stuff every time
 *
 * @param {object} props
 * @param {React.ReactChildren} props.children whatever you're testing
 */
export default ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);
