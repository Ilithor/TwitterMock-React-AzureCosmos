import React from 'react';

// Components
import DeletePostDialog from './DeletePostDialog';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Redux
import { connect } from 'react-redux';

/** Displays the delete post button when authenticated
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {any} props.deleteUserPost
 */
const DeletePost = ({
  classes = {},
  postId,
  userHandle,
  isAuthenticated,
  handle,
  deleteUserPost,
}) => {
  if (isAuthenticated && userHandle === handle) {
    return <DeletePostDialog classes={classes} postId={postId} />;
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

export default connect(mapStateToProps)(withStyles(style)(DeletePost));
