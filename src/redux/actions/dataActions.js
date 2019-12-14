import {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
} from '../types';
import {
  fetchPostList,
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
  deletePost(postId)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(console.log);
};
