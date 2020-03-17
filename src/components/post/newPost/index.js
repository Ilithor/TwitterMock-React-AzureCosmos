import React, { Fragment, useState, useEffect } from 'react';

// Components
import { NewPostDisplay } from './NewPostDisplay';

// MUI
import { Button } from '@material-ui/core';
import { useStyles } from '../post.style';

// Icons
import * as Icon from '@material-ui/icons';

// Context
import { usePostData } from '../postContext';

/** Handles new posts created by the user
 *
 * @returns {React.FunctionComponent}
 */
export const NewPost = () => {
  const classes = useStyles();
  const { newPost, isLoadingNewPost, postError } = usePostData();
  const [open, setOpen] = useState(false);
  const [postBody, setPostBody] = useState('');

  const body = postBody;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = event => {
    const { value } = event.target;
    setPostBody(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const userPost = { body };
    newPost(userPost);
  };
  useEffect(() => {
    if (!postError && !isLoadingNewPost) {
      setPostBody('');
      handleClose();
    }
  }, [postError, isLoadingNewPost]);
  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        variant='contained'
        className={classes?.createButton}
        color='primary'
      >
        <Icon.Add className={classes?.extendedIcon} />
        Create Post
      </Button>
      <NewPostDisplay
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        error={postError}
        handleChange={handleChange}
        isLoading={isLoadingNewPost}
      />
    </Fragment>
  );
};
