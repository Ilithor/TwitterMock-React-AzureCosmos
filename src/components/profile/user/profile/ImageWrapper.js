import React from 'react';
import defaultImage from '../../../../images/user.png';

// Components
import { CustomButton } from '../../../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCurrentUserData } from '../../currentUserContext';

/** View component for displaying the userImage
 *
 * @type {IImageWrapperComponentProps}
 * @returns {React.FunctionComponent}
 */
export const ImageWrapper = ({ handleEditPhoto, handleImageChange }) => {
  const UserImage = () => {
    const { currentUser } = useCurrentUserData();
    const src = currentUser?.bio?.userImage || defaultImage;
    return <img className='profile-image' src={src} alt='profile' />;
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

/**
 * @typedef IImageWrapperComponentProps
 * @property {React.ChangeEventHandler} handleEditPhoto
 * @property {React.ChangeEventHandler} handleImageChange
 */
