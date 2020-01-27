import React from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';

// Icons
import * as Icon from '@material-ui/icons';

/** View component for displaying the user image
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.bioImage
 * @param {React.ChangeEventHandler} props.handleEditPhoto
 * @param {React.ChangeEventHandler} props.handleImageChange
 */
export const ImageWrapper = ({
  bioImage,
  handleEditPhoto,
  handleImageChange,
}) => {
  const UserImage = () => {
    if (!!bioImage) {
      return <img className='profile-image' src={bioImage} alt='profile' />;
    }
    return null;
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
