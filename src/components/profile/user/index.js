import React from 'react';

// Components
import CustomButton from '../../../util/CustomButton';
import { ImageWrapper } from './profile/ImageWrapper';
import { ProfileDetail } from './profile/ProfileDetail';
import { EditDetails } from './editDetails';

// MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style';

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
 * @param {string} props.user.handle
 * @param {string} props.user.createdAt
 * @param {object} props.user.bio
 * @param {any} props.logoutUserAction
 * @param {any} props.uploadImageAction
 */
const UserProfileDisplayView = ({
  classes,
  user: {
    userInfo: { handle, createdAt, bio = {} },
  },
  logoutUserAction,
  uploadImageAction,
}) => {
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

  const handleLogout = () => logoutUserAction();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <ImageWrapper
          bioImage={bio.image}
          handleImageChange={handleImageChange}
          handleEditPhoto={handleEditPhoto}
        />
        <hr />
        <ProfileDetail handle={handle} bio={bio} createdAt={createdAt} />
        <CustomButton tip='Logout' onClick={handleLogout}>
          <KeyboardReturn color='primary' />
        </CustomButton>
        <EditDetails />
      </div>
    </Paper>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapActionsToProps = {
  uploadImageAction,
  logoutUserAction,
};

export const UserProfileDisplay = connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(UserProfileDisplayView));
