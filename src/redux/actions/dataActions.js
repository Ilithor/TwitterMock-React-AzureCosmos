import {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_POSTS,
  NEW_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  LOADING_DATA,
} from '../types';
import {
  fetchPostList,
  createPost,
  likePost,
  unlikePost,
  deletePost,
} from '../../util/fetch/post';

/** Displays all user posts
 * @returns {Promise<array[Document]>}
 */
export const getPostList = () => dispatch => {
  fetchPostList()
    .then(res => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

/** Creates a new post
 * @param {object} newPost
 */
export const newUserPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  createPost(newPost)
    .then(res => {
      dispatch({ type: LOADING_DATA });
      dispatch({
        type: NEW_POST,
        payload: res.data,
      });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error,
      });
    });
};

/** Like a post
 * @param {string} postId
 */
export const getLikePost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  likePost(postId)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};

/** Unlike a post
 * @param {string} postId
 */
export const getUnlikePost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  unlikePost(postId)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};

export const deleteUserPost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  deletePost(postId)
    .then(() => {
      dispatch({ type: LOADING_DATA });
      dispatch({ type: DELETE_POST, payload: postId });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};
