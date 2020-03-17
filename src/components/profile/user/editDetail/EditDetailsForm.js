import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// MUI
import { TextField } from '@material-ui/core';
import { useStyles } from '../../profile.style';

// Context
import { useEditDetailData } from './editDetailContext';

/** Displays the edit form to edit the user's details
 *
 * @type {IEditDetailsFormComponentProps}
 * @returns {React.FunctionComponent}
 */
export const EditDetailsForm = ({
  aboutMe,
  website,
  location,
  handleChange,
}) => {
  const classes = useStyles();
  const { editDetailError, detailError } = useEditDetailData();
  useEffect(() => {
    if (detailError?.general) {
      toast.error(detailError?.general, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    }
    if (editDetailError?.website) {
      toast.error(editDetailError?.website, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
      });
    }
  }, [detailError, editDetailError]);
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

/**
 * @typedef IEditDetailsFormComponentProps
 * @property {string} aboutMe
 * @property {string} website
 * @property {string} location
 * @property {React.ChangeEventHandler} handleChange
 */
