import React from 'react';

// Components
import { ImageWrapper } from './ImageWrapper';
import { ProfileDetails } from './ProfileDetail';
import { EditDetails } from '../editDetails';
import CustomButton from '../../../../util/CustomButton';

// MUI
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import {
  uploadImageAction,
  logoutUserAction,
} from '../../../../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 'auto',
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
}));

/** View component for displaying the user's profile
 * @type {IUserProfileDisplayComponentProps}
 */
const UserProfileDisplayView = ({ handle, bio = {}, createdAt }) => {
  const classes = useStyles();
  const handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  const handleImageChange = event => {
    const image = event?.target?.files[0];
    const formData = new FormData();
    formData.append('image', image, image?.name);
    uploadImageAction(formData, handle);
  };

  const handleLogout = () => logoutUserAction();

  return (
    <Paper className={classes?.paper}>
      <div className={classes?.profile}>
        <ImageWrapper
          bio={bio}
          handleImageChange={handleImageChange}
          handleEditPhoto={handleEditPhoto}
        />
        <hr />
        <ProfileDetails handle={handle} bio={bio} createdAt={createdAt} />
        <CustomButton tip='Logout' onClick={handleLogout}>
          <Icon.KeyboardReturn color='primary' />
        </CustomButton>
        <EditDetails />
      </div>
    </Paper>
  );
};

const mapStateToProps = ({ user }) => {
  const handle = user?.userInfo?.handle;
  const bio = user?.userInfo?.bio;
  const createdAt = user?.userInfo?.createdAt;
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

export const UserProfileDisplay = connect(
  mapStateToProps,
  mapActionsToProps
)(UserProfileDisplayView);

/** View component for displaying the user's profile
 * @typedef {IUserProfileDisplayComponentProps}
 * @param {string} handle
 * @param {object} bio
 * @param {string} createdAt
 */
