import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ImageWrapper } from './ImageWrapper';
import { ProfileBio } from './ProfileBio';
import { EditDetail } from '../editDetail';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { Paper } from '@material-ui/core';
import { useStyles } from '../../profile.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCurrentUserData } from '../../currentUserContext';
import { useImageUploadData } from './uploadImageContext';
import { useLogoutData } from '../../../login/logoutContext';

/** View component for displaying the user's profile
 *
 * @returns {React.FunctionComponent}
 */
export const ProfileDetail = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  const { imageUpload } = useImageUploadData();
  const { logoutUser } = useLogoutData();

  const handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  const handleImageChange = event => {
    const image = event.target.files[0];
    if (image.size / 1024 > 50000) {
      toast.error('This image size exceeds the acceptable limit', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    } else {
      const formData = new FormData();
      formData.append('image', image, image.name);
      imageUpload(formData);
    }
  };
  const handleLogout = () => logoutUser();

  return (
    <Paper className={classes?.paper}>
      <div className={classes?.profile}>
        <ImageWrapper
          bioImage={currentUser?.bio?.userImage}
          handleImageChange={handleImageChange}
          handleEditPhoto={handleEditPhoto}
        />
        <ToastContainer />
        <hr />
        <ProfileBio
          userHandle={currentUser?.userHandle}
          bio={currentUser?.bio}
          createdAt={currentUser?.createdAt}
        />
        <CustomButton tip='Logout' onClick={handleLogout}>
          <Icon.KeyboardReturn color='primary' />
        </CustomButton>
        <EditDetail />
      </div>
    </Paper>
  );
};
