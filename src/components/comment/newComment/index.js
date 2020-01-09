import React from 'react';

// Components
import CommentForm from './CommentForm';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Redux
import { connect } from 'react-redux';

const NewComment = ({ classes, postId, isAuthenticated }) => {
  const createCommentForm = () => {
    if (isAuthenticated) {
      return <CommentForm classes={classes} postId={postId} />;
    }
    return <div />;
  };

  return createCommentForm();
};

const mapStateToProps = ({ user }) => {
  const isAuthenticated = !!user.authenticated;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(withStyles(style)(NewComment));
