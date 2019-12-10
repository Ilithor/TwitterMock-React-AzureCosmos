import React from 'react';

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
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {string} props.handle
 * @param {object} props.bio
 * @param {string} props.createdAt
 */
const UserProfileDisplay = ({ classes, handle, bio, createdAt }) => {
  const handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImageAction(formData, handle);
  };

  const handleLogout = () => {
    logoutUserAction();
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <ImageWrapper
          bio={bio}
          handleImageChange={handleImageChange}
          handleEditPhoto={handleEditPhoto}
        />
        <hr />
        <ProfileDetails handle={handle} bio={bio} createdAt={createdAt} />
        <CustomButton tip='Logout' onClick={handleLogout}>
          <KeyboardReturn color='primary' />
        </CustomButton>
        <EditDetails />
      </div>
    </Paper>
  );
};

const mapStateToProps = ({ user }) => {
  const handle = user.userInfo.handle;
  const bio = user.userInfo.bio;
  const createdAt = user.userInfo.createdAt;
  return {
    handle,
    bio,
    createdAt,
  };
};

const mapActionsToProps = {
  uploadImageAction,
  logoutUserAction,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(UserProfileDisplay));
