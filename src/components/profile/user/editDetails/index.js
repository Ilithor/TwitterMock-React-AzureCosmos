import React, { Fragment, useState } from 'react';

// Components
import CustomButton from '../../../../util/CustomButton';
import { EditDetailsDisplay } from './EditDetailsDisplay';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// Icons
import * as Icon from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { editUserDetailAction } from '../../../../redux/actions/userActions';

const useStyles = makeStyles({
  buttonEdit: {
    float: 'right',
  },
});

/** Control how the user edits their bio information
 * @type {React.FunctionComponent}
 * @param {object} props
 * @param {object} props.bio
 * @param {string} props.handle
 * @param {any} props.editUserDetailAction
 */
const EditDetailsView = ({ bio = {}, handle, editUserDetailAction }) => {
  const classes = useStyles();
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
      aboutMe: bio?.aboutMe,
      website: bio?.website,
      location: bio?.location,
    });
  };

  const handleClose = () => setOpen(false);

  const handleChange = event => {
    const { name, value } = event?.target;
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
        btnClassName={classes?.buttonEdit}
      >
        <Icon.Edit color='primary' />
      </CustomButton>
      <EditDetailsDisplay
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

const mapStateToProps = ({ user }) => {
  const bio = user?.userInfo?.bio;
  const handle = user?.userInfo?.handle;
  return {
    bio,
    handle,
  };
};

export const EditDetails = connect(
  mapStateToProps,
  { editUserDetailAction }
)(EditDetailsView);
