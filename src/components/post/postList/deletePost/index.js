import React from 'react';

// Components
import { DeletePostDialog } from './DeletePostDialog';

// Redux
import { connect } from 'react-redux';

/** Displays the delete post button when authenticated
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {any} props.deleteUserPost
 */
const DeletePostView = ({
  postId,
  userHandle,
  isAuthenticated,
  handle,
  deleteUserPost,
}) => {
  if (isAuthenticated && userHandle === handle) {
    return <DeletePostDialog postId={postId} />;
  } else {
    return <div />;
  }
};

const mapStateToProps = ({ user }) => {
  const isAuthenticated = !!user.authenticated;
  const handle = user.userInfo.handle;
  return {
    isAuthenticated,
    handle,
  };
};

export const DeletePost = connect(mapStateToProps)(DeletePostView);
