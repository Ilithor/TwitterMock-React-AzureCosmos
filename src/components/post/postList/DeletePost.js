import React, { Fragment, useState } from 'react';

// Components
import CustomButton from '../../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteUserPost } from '../../../redux/actions/dataActions';

const DeletePost = ({
  classes,
  postId,
  userHandle,
  isAuthenticated,
  handle,
}) => {
  const [openState, setOpenState] = useState({
    open: false,
  });
  const { open } = openState;
  const handleOpen = () => {
    setOpenState({ ...openState, open: true });
  };
  const handleClose = () => {
    setOpenState({ ...openState, open: false });
  };
  const deletePost = () => {
    deleteUserPost(postId);
    setOpenState({ ...openState, open: false });
  };
  if (isAuthenticated && userHandle === handle) {
    return (
      <Fragment>
        <CustomButton
          tip='Delete Post'
          onClick={handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </CustomButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={deletePost} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
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

export default connect(
  mapStateToProps,
  { deleteUserPost }
)(withStyles(style)(DeletePost));
