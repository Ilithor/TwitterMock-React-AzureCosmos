import React from 'react';

// Components
import { ImageWrapper } from './ImageWrapper';
import { ProfileDetails } from './ProfileDetail';
import { EditDetails } from '../editDetail';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useCurrentUserData,
  useUserLogout,
  useUploadImageData,
} from '../../userContext';

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
export const UserProfileDisplay = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  const { uploadImage, userError } = useUploadImageData();
  const { logoutUser } = useUserLogout();
  const handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };
  const handleImageChange = event => {
    const image = event?.target?.files[0];
    const formData = new FormData();
    formData.append('image', image, image?.name);
    uploadImage(formData).then(() => console.log(userError));
  };

  const handleLogout = () => logoutUser();

  return (
    <Paper className={classes?.paper}>
      <div className={classes?.profile}>
        <ImageWrapper
          handleImageChange={handleImageChange}
          handleEditPhoto={handleEditPhoto}
        />
        <hr />
        <ProfileDetails
          handle={currentUser?.handle}
          bio={currentUser?.bio}
          createdAt={currentUser?.createdAt}
        />
        <CustomButton tip='Logout' onClick={handleLogout}>
          <Icon.KeyboardReturn color='primary' />
        </CustomButton>
        <EditDetails />
      </div>
    </Paper>
  );
};
