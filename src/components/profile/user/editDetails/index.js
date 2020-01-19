import React, { Fragment, useState } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';
import EditDetailsDisplay from './EditDetailsDisplay';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../../../style';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';
import { editUserDetailAction } from '../../../../redux/actions/userActions';

/** Control how the user edits their bio information
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {object} props.bio
 * @param {string} props.handle
 * @param {any} props.editUserDetailAction
 */
const EditDetails = ({
  classes = {},
  bio = {},
  handle,
  editUserDetailAction,
}) => {
  const [editorState, setEditorState] = useState({
    aboutMe: '',
    website: '',
    location: '',
  });
  const [open, setOpen] = useState(false);
  const { aboutMe, website, location } = editorState;

  const handleOpen = () => {
    setOpen(true);
    setEditorState({
      aboutMe: bio.aboutMe,
      website: bio.website,
      location: bio.location,
    });
  };

  const handleClose = () => setOpen(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setEditorState({
      ...editorState,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const userDetail = {
      aboutMe,
      website,
      location,
    };
    editUserDetailAction(userDetail, handle);
    handleClose();
  };

  return (
    <Fragment>
      <CustomButton
        tip='Edit Details'
        onClick={handleOpen}
        btnClassName={classes.buttonEdit}
      >
        <EditIcon color='primary' />
      </CustomButton>
      <EditDetailsDisplay
        classes={classes}
        open={open}
        handleClose={handleClose}
        aboutMe={aboutMe}
        handleChange={handleChange}
        website={website}
        location={location}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  const bio = state.user.userInfo.bio;
  const handle = state.user.userInfo.handle;
  return {
    bio,
    handle,
  };
};

export default connect(
  mapStateToProps,
  { editUserDetailAction }
)(withStyles(style)(EditDetails));
