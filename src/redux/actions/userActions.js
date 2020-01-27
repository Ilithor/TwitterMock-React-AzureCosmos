import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  IS_UI_LOADING,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LOADING_DATA,
  SET_POSTS,
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
  // dispatch({ type: IS_UI_LOADING, payload: true });
  // loginUser(userData)
  //   .then(res => {
  //     setAuthorizationHeader(res.data.token);
  //     const handle = res.data.handle;
  //     setUserHandleHeader(handle);
  //     dispatch(getUserDataAction(handle));
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/');
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data.error,
  //     });
  //   });
};

/** Fetches user data and saves to redux store
 * @param {string} handle
 */
export const getUserDataAction = handle => dispatch => {
//   dispatch({ type: LOADING_USER });
//   getUserData(handle)
//     .then(res => {
//       dispatch({
//         type: SET_USER,
//         payload: res.data,
//       });
//     })
//     .catch(console.log);
};

/** Retrieves user posts and saves to redux store
 * @param {string} handle
 */
export const getUserPostAction = handle => dispatch => {
//   dispatch({ type: LOADING_DATA });
//   getUserData(handle)
//     .then(res => {
//       dispatch({ type: SET_POSTS, payload: res.data.post });
//     })
//     .catch(err => {
//       dispatch({ type: SET_POSTS, payload: null });
//     });
};

/** Attempts to create a new user
 * @param {*} newUserData
 * @param {HIstory} history
 */
export const registerUserAction = (newUserData, history) => dispatch => {
  // dispatch({ type: IS_UI_LOADING, payload: true });
  // registerUser(newUserData)
  //   .then(res => {
  //     setAuthorizationHeader(res.data.token);
  //     const handle = res.data.handle;
  //     setUserHandleHeader(handle);
  //     dispatch(getUserDataAction(handle));
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/');
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data.error,
  //     });
  //   });
};

/** Attempts to logout the user
 */
export const logoutUserAction = () => dispatch => {
  // localStorage.removeItem('Token');
  // localStorage.removeItem('Handle');
  // delete axios.defaults.headers.common['Authorization'];
  // dispatch({ type: SET_UNAUTHENTICATED });
};

/** Storing user token in storage
 * @param {string} token
 */
const setAuthorizationHeader = token => {
  const Token = `Bearer ${token}`;
  localStorage.setItem('Token', Token);
  axios.defaults.headers.common['Authorization'] = Token;
};

/** Storing userHandle into storage
 * @param {string} handle
 */
const setUserHandleHeader = handle => {
  localStorage.setItem('Handle', handle);
};

/** Attempts to upload image as new user image
 * @param {*} formData
 * @param {string} handle
 */
export const uploadImageAction = (formData, handle) => dispatch => {
  // dispatch({ type: LOADING_USER });
  // uploadImage(formData)
  //   .then(() => {
  //     dispatch(getUserDataAction(handle));
  //   })
  //   .catch(console.log);
};

/** Attempts to edit user details
 * @param {*} userDetail
 * @param {string} handle
 */
export const editUserDetailAction = (userDetail, handle) => dispatch => {
  // dispatch({ type: LOADING_USER });
  // editUserDetail(userDetail)
  //   .then(() => {
  //     dispatch(getUserDataAction(handle));
  //   })
  //   .catch(console.log);
};
