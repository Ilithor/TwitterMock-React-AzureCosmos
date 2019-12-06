import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from '../../../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../style/style';

// Icons
import EditIcon from '@material-ui/icons/Edit';

/** View component for displaying the user image
 * @param {IImageWrapperComponentProps} props
 */
const ImageWrapper = props => {
  const { bio, handleEditPhoto, handleImageChange } = props;
  return (
    <div className='image-wrapper'>
      {bio.image ? (
        <img className='profile-image' src={bio.image} alt='profile' />
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

ImageWrapper.propTypes = {
  bio: PropTypes.object,
  handleEditPhoto: PropTypes.func,
  handleImageChange: PropTypes.func,
};

export default withStyles(style)(ImageWrapper);

/** Props passed to the ImageWrapper view component
 * @typedef IImageWrapperComponentProps
 * @property {object} bio
 * @property {function} handleEditPhoto
 * @property {function} handleImageChange
 */
