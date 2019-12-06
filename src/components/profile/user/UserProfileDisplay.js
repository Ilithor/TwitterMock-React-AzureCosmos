import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from '../../../util/CustomButton';
import ImageWrapper from './ImageWrapper';
import ProfileDetails from './ProfileDetails';
import EditDetails from './EditDetails';

// MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { connect } from 'react-redux';
import {
  uploadImageAction,
  logoutUserAction,
} from '../../../redux/actions/userActions';

/** View component for displaying the user's profile
 * @param {IUserProfileDisplayComponentProps} props
 */
class UserProfileDisplay extends Component {
  handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImageAction(formData, this.props.user.handle);
  };

  handleLogout = () => {
    this.props.logoutUserAction();
  };

  render() {
    const {
      classes,
      user: {
        userInfo: { handle, createdAt, bio },
      },
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <ImageWrapper
            bio={bio}
            handleImageChange={this.handleImageChange}
            handleEditPhoto={this.handleEditPhoto}
          />
          <hr />
          <ProfileDetails handle={handle} bio={bio} createdAt={createdAt} />
          <CustomButton tip='Logout' onClick={this.handleLogout}>
            <KeyboardReturn color='primary' />
          </CustomButton>
          <EditDetails />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImageAction,
  logoutUserAction,
};

UserProfileDisplay.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(UserProfileDisplay));

/** Props passed to the UserProfileDisplay view component
 * @typedef IUserProfileDisplayComponentProps
 * @property {object} user
 * @property {object} classes
 */
