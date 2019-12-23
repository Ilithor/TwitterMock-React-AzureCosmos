import React, { Fragment, useState, useEffect } from 'react';

// Components
import NewPostDisplay from './NewPostDisplay';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import style from '../../../style/style';

// Icons
import AddIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';
import { newUserPost } from '../../../redux/actions/dataActions';

const NewPost = ({ classes = {}, UI = {}, newUserPost }) => {
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
        classes={classes}
        handleSubmit={handleSubmit}
        error={UI.error}
        handleChange={handleChange}
        isLoading={UI.isLoading}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ UI }) => {
  return { UI };
};

export default connect(
  mapStateToProps,
  { newUserPost }
)(withStyles(style)(NewPost));
