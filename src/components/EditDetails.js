import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

// Redux
import { connect } from 'react-redux';
import { editUserDetailAction } from '../redux/actions/userActions';

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';

class EditDetails extends Component {
  state = {
    aboutMe: '',
    website: '',
    location: '',
    open: false,
  };

  mapUserDetailToState = bio => {
    this.setState({
      aboutMe: bio.aboutMe ? bio.aboutMe : '',
      website: bio.website ? bio.website : '',
      location: bio.location ? bio.location : '',
    });
  };

  componentDidMount = () => {
    const { bio } = this.props;
    this.mapUserDetailToState(bio);
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailToState(this.props.bio);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetail = {
      aboutMe: this.state.aboutMe,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetailAction(userDetail, this.props.handle);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title='Edit details' placement='top'>
          <IconButton onClick={this.handleOpen} className={classes.buttonEdit}>
            <EditIcon color='primary' />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='aboutMe'
                type='text'
                label='AboutMe'
                multiline
                rows='3'
                placeholder='A short bio about yourself'
                className={classes.textField}
                value={this.state.aboutMe}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='website'
                type='text'
                label='Website'
                placeholder='Your personal website'
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='location'
                type='text'
                label='Location'
                placeholder='Where you live'
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetailAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  bio: state.user.bio,
  handle: state.user.handle,
});

export default connect(
  mapStateToProps,
  { editUserDetailAction }
)(withStyles(style)(EditDetails));
