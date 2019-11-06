import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';
import { loginUser, getUserData } from '../../util/fetch';

/** Attempts to login user
 * @param {*} userData 
 * @param {History} history 
 */
export const loginUserAction = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  loginUser(userData)
    .then(res => {
      const Token = `Bearer ${res.data.token}`;
      const handle = res.data.handle;
      localStorage.setItem('Token', Token);
      axios.defaults.headers.common['Authorization'] = Token;
      dispatch(getUserData(handle));
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

/** Fetches user data and saves to redux store
 * @param {string} handle 
 */
export const getUserDataAction = handle => dispatch => {
  fetchUserData(handle)
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data.user,
      });
    })
    .catch(console.log);
};
