import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';
import axios from 'axios';
import {
  loginUser,
  registerUser,
  getUserData,
  uploadImage,
  editUserDetail,
} from '../../util/fetch/user';

/** Attempts to login user
 * @param {*} userData
 * @param {History} history
 */
export const loginUserAction = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  loginUser(userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      const handle = res.data.handle;
      setUserHandleHeader(handle);
      dispatch(getUserDataAction(handle));
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

/** Fetches user data and saves to redux store
 * @param {string} handle
 */
export const getUserDataAction = handle => dispatch => {
  dispatch({ type: LOADING_USER });
  getUserData(handle)
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch(console.log);
};

export const registerUserAction = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  registerUser(newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      const handle = res.data.handle;
      setUserHandleHeader(handle);
      dispatch(getUserDataAction(handle));
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

export const logoutUserAction = () => dispatch => {
  localStorage.removeItem('Token');
  localStorage.removeItem('Handle');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = token => {
  const Token = `Bearer ${token}`;
  localStorage.setItem('Token', Token);
  axios.defaults.headers.common['Authorization'] = Token;
};

const setUserHandleHeader = handle => {
  localStorage.setItem('Handle', handle);
};

export const uploadImageAction = (formData, handle) => dispatch => {
  dispatch({ type: LOADING_USER });
  uploadImage(formData)
    .then(() => {
      dispatch(getUserDataAction(handle));
    })
    .catch(console.log);
};

export const editUserDetailAction = (userDetail, handle) => dispatch => {
  dispatch({ type: LOADING_USER });
  editUserDetail(userDetail)
    .then(() => {
      dispatch(getUserDataAction(handle));
    })
    .catch(console.log);
};
