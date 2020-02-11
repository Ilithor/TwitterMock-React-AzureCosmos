import React, { Fragment, useState } from 'react';

// Components
import { EditDetailsDisplay } from './EditDetailsDisplay';
import { CustomButton } from '../../../../util/CustomButton';

// MUI
import { useStyles } from '../../profile.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { useCurrentUserData } from '../../currentUserContext';
import { useEditDetailData } from './editDetailContext';

/** Control how the user edits their bio information
 *
 * @type {React.FunctionComponent}
 */
export const EditDetail = () => {
  const classes = useStyles();
  const { currentUser, userError, setUserError } = useCurrentUserData();
  const {
    editDetail,
    isLoadingEditDetail,
    editDetailError,
    validationCheckUserDetail,
  } = useEditDetailData();
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
      aboutMe: currentUser?.bio?.aboutMe,
      website: currentUser?.bio?.website,
      location: currentUser?.bio?.location,
    });
  };

  const handleClose = () => setOpen(false);

  const handleChange = event => {
    if (userError) {
      setUserError();
    }
    const { name, value } = event?.target;
    setEditorState(
      validationCheckUserDetail({
        ...editorState,
        [name]: value,
      })
    );
  };

  const handleSubmit = event => {
    if (!isLoadingEditDetail) {
      event.preventDefault();
      const userDetail = {
        aboutMe,
        website,
        location,
      };
      editDetail(userDetail)
        .then(() => {
          if (!userError && !editDetailError) {
            handleClose();
          }
        })
        .catch(err => {
          console.error(err);
          setUserError(err);
        });
    }
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
