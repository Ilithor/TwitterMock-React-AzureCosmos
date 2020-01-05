import {
  IS_UI_LOADING,
  CLEAR_ERRORS,
  SET_POSTS,
  SET_POST,
  NEW_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  LOADING_DATA,
} from '../types';
import {
  fetchPostList,
  fetchPost,
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
  dispatch({ type: IS_UI_LOADING, payload: true });
  createPost(newPost)
    .then(res => {
      dispatch({ type: LOADING_DATA });
      dispatch({ type: NEW_POST, payload: res.data });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

/** Retrieves one post
 * @param {string} postId
 */
export const getPost = postId => dispatch => {
  dispatch({ type: IS_UI_LOADING, payload: true });
  fetchPost(postId)
    .then(res => {
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: IS_UI_LOADING, payload: false });
    })
    .catch(console.log);
};

/** Like a post
 * @param {string} postId
 */
export const getLikePost = postId => dispatch => {
  dispatch({ type: IS_UI_LOADING, payload: true });
  likePost(postId)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPost(postId));
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};

/** Unlike a post
 * @param {string} postId
 */
export const getUnlikePost = postId => dispatch => {
  dispatch({ type: IS_UI_LOADING, payload: true });
  unlikePost(postId)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPost(postId));
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};

export const deleteUserPost = postId => dispatch => {
  dispatch({ type: IS_UI_LOADING, payload: true });
  deletePost(postId)
    .then(() => {
      dispatch({ type: LOADING_DATA });
      dispatch({ type: DELETE_POST, payload: postId });
      dispatch(getPostList());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(console.log);
};
