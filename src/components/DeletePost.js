import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteUserPost } from '../redux/actions/dataActions';

class DeletePost extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = () => {
    this.props.deleteUserPost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { isAuthenticated, classes, userHandle, handle } = this.props;
    if (isAuthenticated && userHandle === handle) {
      return (
        <Fragment>
          <CustomButton
            tip='Delete Post'
            onClick={this.handleOpen}
            btnClassName={classes.deleteButton}
          >
            <DeleteOutline color='secondary' />
          </CustomButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>
              Are you sure you want to delete this post?
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.deletePost} color='secondary'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    } else {
      return <div />;
    }
  }
}

DeletePost.propTypes = {
  deleteUserPost: PropTypes.func,
  classes: PropTypes.object,
  postId: PropTypes.string,
  userHandle: PropTypes.string,
  handle: PropTypes.string,
  isAuthenticated: PropTypes.bool,
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
