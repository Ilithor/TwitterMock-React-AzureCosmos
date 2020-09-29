import React, { Fragment } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import defaultImage from '../../../../images/user.png';

// Components
import { PostDialogContent } from './PostDialogContent';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Dialog, DialogContent, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../post.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useUserListData } from '../../../profile/user/userListContext';

/** View component for displaying an individual post's content in a dialog box
 *
 * @type {IPostDialogComponentProps}
 * @returns {React.FunctionComponent}
 */
export const PostDialog = ({ post, userHandle }) => {
  const { userList, isLoadingUserList } = useUserListData();
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const open = params?.postId === post?.postId;
  const history = useHistory();
  const handleOpen = () => {
    history.push(`/u/${userHandle}/post/${post?.postId}`);
  };
  const handleClose = () => {
    history.push(location.pathname.replace(`/post/${post?.postId}`, ''));
  };
  const DialogContentEditor = () => {
    if (!isLoadingUserList) {
      const { userImage } = userList[post?.userHandle] || defaultImage;
      return (
        <PostDialogContent
          userHandle={userHandle}
          userImage={userImage}
          createdAt={post?.createdAt}
          body={post?.body}
          postId={post?.postId}
          likeCount={post?.likeCount}
          commentCount={post?.commentCount}
        />
      );
    }
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    );
  };
  return (
    <Fragment>
      <CustomButton
        onClick={handleOpen}
        tip='Expand Post'
        tipClassName={classes?.expandButton}
      >
        <Icon.UnfoldMore color='primary' />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <CustomButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes?.closeButtonPostDialog}
        >
          <Icon.Close />
        </CustomButton>
        <DialogContent className={classes?.dialogContent}>
          <DialogContentEditor />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

/**
 * @typedef IPostDialogComponentProps
 * @property {string} postId
 * @property {string} userHandle
 */
