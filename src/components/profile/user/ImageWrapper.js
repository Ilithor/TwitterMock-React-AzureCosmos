import React from 'react';

// Components
import CustomButton from '../../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Icons
import EditIcon from '@material-ui/icons/Edit';

/** View component for displaying the user image
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.bioImage
 * @param {React.ChangeEventHandler} props.handleEditPhoto
 * @param {React.ChangeEventHandler} props.handleImageChange
 */
const ImageWrapper = ({ bioImage, handleEditPhoto, handleImageChange }) => {
  return (
    <div className='image-wrapper'>
      {bioImage ? (
        <img className='profile-image' src={bioImage} alt='profile' />
      ) : (
        <div>Derp</div>
      )}
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
        <EditIcon color='primary' />
      </CustomButton>
    </div>
  );
};

export default withStyles(style)(ImageWrapper);
