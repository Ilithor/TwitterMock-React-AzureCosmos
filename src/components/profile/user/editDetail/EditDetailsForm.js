import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// MUI
import { TextField } from '@material-ui/core';
import { useStyles } from '../../profile.style';
import { useValidationEditUserDetail, useUserData } from '../../userContext';

/** Displays the edit form to edit the user's details
 *
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {string} props.aboutMe
 * @param {string} props.website
 * @param {string} props.location
 * @param {React.ChangeEventHandler} props.handleChange
 */
export const EditDetailsForm = ({
  aboutMe,
  handleChange,
  website,
  location,
}) => {
  const classes = useStyles();
  const { userError } = useUserData();
  const { detailError } = useValidationEditUserDetail();
  useEffect(() => {
    if (detailError?.general) {
      toast.error(detailError?.general, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    }
    if (userError?.website) {
      toast.error(userError?.website, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    }
  }, [detailError, userError]);
  return (
    <form>
      <TextField
        name='aboutMe'
        type='text'
        label='AboutMe'
        multiline
        rows='3'
        placeholder='A short bio about yourself'
        className={classes?.textField}
        value={aboutMe}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name='website'
        type='text'
        label='Website'
        placeholder='Your personal website'
        className={classes?.textField}
        helperText={detailError?.website}
        error={detailError?.website ? true : false}
        value={website}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name='location'
        type='text'
        label='Location'
        placeholder='Where you live'
        className={classes?.textField}
        value={location}
        onChange={handleChange}
        fullWidth
      />
      <ToastContainer />
    </form>
  );
};
