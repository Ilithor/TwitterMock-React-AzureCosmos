import React, { Fragment, useState } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';
import PostDialogContent from './PostDialogContent';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style/style';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../../../../redux/actions/dataActions';

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
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    getPost(postId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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

export default connect(
  mapStateToProps,
  { getPost }
)(withStyles(style)(PostDialog));
