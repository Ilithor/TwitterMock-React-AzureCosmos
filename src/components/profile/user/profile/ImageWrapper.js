import React from 'react';

// Components
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCurrentUserData } from '../../userContext';

const useStyles = makeStyles({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

/** View component for displaying the user image
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {React.ChangeEventHandler} props.handleEditPhoto
 * @param {React.ChangeEventHandler} props.handleImageChange
 */
export const ImageWrapper = ({ handleEditPhoto, handleImageChange }) => {
  const classes = useStyles();
  const UserImage = () => {
    const { currentUser } = useCurrentUserData();
    if (currentUser?.bio?.image) {
      return (
        <img
          className='profile-image'
          src={currentUser?.bio?.image}
          alt='profile'
        />
      );
    }
    return (
      <div className={classes?.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    );
  };
  return (
    <div className='image-wrapper'>
      <UserImage />
      <input
        type='file'
        id='imageUpload'
        hidden='hidden'
        onChange={handleImageChange}
      />
      <CustomButton
        tip='Edit Profile Picture'
        onClick={handleEditPhoto}
        btnClassName='button'
      >
        <Icon.Edit color='primary' />
      </CustomButton>
    </div>
  );
};
