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

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useCurrentUserData,
  useUserLogout,
  useUploadImageData,
} from '../../userContext';

/** View component for displaying the user's profile
 * @type {IUserProfileDisplayComponentProps}
 */
export const ProfileDetail = ({ classes }) => {
  const { currentUser } = useCurrentUserData();
  const { uploadImage } = useUploadImageData();
  const { logoutUser } = useUserLogout();

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
      uploadImage(formData);
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
