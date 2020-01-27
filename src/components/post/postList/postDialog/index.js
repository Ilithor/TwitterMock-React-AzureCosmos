import React, { Fragment } from 'react';
import _ from 'lodash';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// Components
import { PostDialogContent } from './PostDialogContent';
import CustomButton from '../../../../util/CustomButton';

// MUI
import { Dialog, DialogContent, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { usePostData } from '../../postContext';
import { useUserListData } from '../../../context/userContext';
import { useCommentListData } from '../../../comment/commentContext';

const useStyles = makeStyles({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  closeButtonPostDialog: {
    position: 'absolute',
    left: '90%',
  },
  dialogContent: {
    padding: 20,
  },
});

/** View component for displaying an individual post's content in a dialog box
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.postId
 * @param {string} props.userHandle
 */
export const PostDialog = ({ postId, userHandle }) => {
  const { postList, isLoadingPostList } = usePostData();
  const { userList } = useUserListData();
  const { commentList } = useCommentListData();
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const open = params.postId === postId;
  const post = postList[postId];
  const dialogCommentList = _.filter(
    commentList,
    comment => comment.postId === postId
  );
  const { userImage } = userList[(post?.userHandle)];
  const history = useHistory();
  const handleOpen = () => {
    history.push(`/u/${userHandle}/post/${postId}`);
  };
  const handleClose = () => {
    history.push(location.pathname.replace(`/post/${postId}`, ''));
  };
  const DialogContentEditor = () => {
    if (isLoadingPostList) {
      return (
        <div className={classes?.spinnerDiv}>
          <CircularProgress size={200} thickness={2} />
        </div>
      );
    }
    return (
      <PostDialogContent
        userHandle={userHandle}
        userImage={userImage}
        createdAt={post?.createdAt}
        body={post?.body}
        postId={post?._id}
        likeCount={post?.likeCount}
        commentCount={post?.commentCount}
        commentList={dialogCommentList}
      />
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
