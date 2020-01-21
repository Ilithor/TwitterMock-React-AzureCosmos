import React, { Fragment, useState, useEffect } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';
import PostDialogContent from './PostDialogContent';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux
import { connect } from 'react-redux';
import { getPost, clearError } from '../../../../redux/actions/dataActions';

/** View component for displaying an individual post's content in a dialog box
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.postId
 * @param {string} props.userHandle
 * @param {object} props.UI
 * @param {object} props.post
 * @param {any} props.getPost
 */
const PostDialog = ({
  classes = {},
  postId,
  userHandle,
  UI = {},
  post = {},
  getPost,
  clearError,
  openDialog,
}) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  useEffect(() => {
    if (!!openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOpen = () => {
    let currentOldPath = window.location.pathname;
    const currentNewPath = `/u/${userHandle}/post/${postId}`;
    if ((currentOldPath = currentNewPath)) {
      currentOldPath = `/u/${userHandle}`;
    }
    window.history.pushState(null, null, currentNewPath);
    setOpen(true);
    setOldPath(currentOldPath);
    getPost(postId);
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    clearError();
  };
  const makeDialogContentEditor = () => {
    if (UI.isLoading) {
      return (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={200} thickness={2} />
        </div>
      );
    }
    return (
      <PostDialogContent
        classes={classes}
        userHandle={userHandle}
        userImage={post.userImage}
        createdAt={post.createdAt}
        body={post.body}
        postId={post._id}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        commentList={post.commentList}
      />
    );
  };
  return (
    <Fragment>
      <CustomButton
        onClick={handleOpen}
        tip='Expand Post'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <CustomButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButtonPostDialog}
        >
          <CloseIcon />
        </CustomButton>
        <DialogContent className={classes.dialogContent}>
          {makeDialogContentEditor()}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => {
  const UI = state.UI;
  const post = state.data.post;
  return { UI, post };
};

const mapActionsToProps = {
  getPost,
  clearError,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(PostDialog));
