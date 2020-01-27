import React, { Fragment, useState, useEffect } from 'react';

// Components
import { NewPostDisplay } from './NewPostDisplay';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Icons
import AddIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';
import { newUserPost } from '../../../redux/actions/dataActions';

const useStyles = makeStyles({
  createButton: {
    position: 'relative',
    left: '33%',
    marginBottom: 20,
  },
});

const NewPostView = ({ UI = {}, newUserPost }) => {
  const classes = useStyles();
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
    newUserPost(userPost);
  };
  useEffect(() => {
    if (!UI.error.body && !UI.isLoading) {
      setPostBody('');
      handleClose();
    }
  }, [UI.error, UI.isLoading]);
  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        variant='contained'
        className={classes.createButton}
        color='primary'
      >
        <AddIcon className={classes.extendedIcon} />
        Create Post
      </Button>
      <NewPostDisplay
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        error={UI.error}
        handleChange={handleChange}
        isLoading={UI.isLoading}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ UI }) => ({ UI });

export const NewPost = connect(
  mapStateToProps,
  { newUserPost }
)(NewPostView);
