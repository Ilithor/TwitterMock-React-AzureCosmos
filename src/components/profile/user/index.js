import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ImageWrapper } from './profile/ImageWrapper';
import { ProfileDetail } from './profile/ProfileDetail';
import { EditDetail } from './editDetail';
import { CustomButton } from '../../../util/CustomButton';

// MUI
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import {
  useUserLogout,
  useCurrentUserData,
  useUploadImageData,
} from '../userContext';

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
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
}));

/** View component for displaying the user's profile
 * @type {React.FunctionComponent}
 */
export const UserProfileDisplay = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  const { logoutUser } = useUserLogout();
  const { uploadImage } = useUploadImageData();

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
      uploadImage(formData, currentUser?.handle);
    }
  };

  const handleLogout = () => logoutUser();
  if (Object.keys(currentUser)?.length > 0) {
    return (
      <Paper className={classes?.paper}>
        <div className={classes?.profile}>
          <ImageWrapper
            bioImage={currentUser?.bio?.image}
            handleImageChange={handleImageChange}
            handleEditPhoto={handleEditPhoto}
          />
          <ToastContainer />
          <hr />
          <ProfileDetail
            handle={currentUser?.handle}
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
  }
  return (
    <Paper className={classes?.paper}>
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    </Paper>
  );
};
