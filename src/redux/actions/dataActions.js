import { SET_POSTS, LIKE_POST, UNLIKE_POST } from '../types';
import { fetchPostList, likePost, unlikePost } from '../../util/fetch/post';

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
  likePost(postId)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPostList());
    })
    .catch(console.log);
};

/** Unlike a post
 * @param {string} postId
 */
export const getUnlikePost = postId => dispatch => {
  unlikePost(postId)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: { ...res.data, postId } });
      dispatch(getPostList());
    })
    .catch(console.log);
};
