import React, { Fragment, useState } from 'react';

// Components
import { EditDetailsDisplay } from './EditDetailsDisplay';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { useStyles } from '../../profile.style';

// Icons
import * as Icon from '@material-ui/icons';
import { useCurrentUserData, useEditUserDetailData } from '../../userContext';

/** Control how the user edits their bio information
 * 
 * @type {React.FunctionComponent}
 */
export const EditDetail = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUserData();
  const { editUserDetail } = useEditUserDetailData();
  const [editorState, setEditorState] = useState({
    aboutMe: '',
    website: '',
    location: '',
  });
  const [open, setOpen] = useState(false);
  const { aboutMe, website, location } = editorState;

  const handleOpen = () => {
    setOpen(true);
    console.log(currentUser);
    setEditorState({
      aboutMe: currentUser?.bio?.aboutMe,
      website: currentUser?.bio?.website,
      location: currentUser?.bio?.location,
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
    editUserDetail(userDetail);
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
