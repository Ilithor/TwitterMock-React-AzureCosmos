import React from 'react';

// MUI
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    margin: '10px auto 10px auto',
  },
});

/** Displays the edit form to edit the user's details
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
    </form>
  );
};
