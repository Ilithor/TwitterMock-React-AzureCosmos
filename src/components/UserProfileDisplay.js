import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';

// MUI
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { connect } from 'react-redux';
import {
  uploadImageAction,
  logoutUserAction,
} from '../redux/actions/userActions';

class UserProfileDisplay extends Component {
  handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImageAction(formData, this.props.user.handle);
  };

  handleLogout = () => {
    this.props.logoutUserAction();
  };

  render() {
    const {
      classes,
      user: { handle, createdAt, bio },
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            {bio.image ? (
              <img className='profile-image' src={bio.image} alt='profile' />
            ) : (
              <div>Derp</div>
            )}
            <input
              type='file'
              id='imageUpload'
              hidden='hidden'
              onChange={this.handleImageChange}
            />
            <Tooltip title='Edit profile picture' placement='top'>
              <IconButton onClick={this.handleEditPhoto} className='button'>
                <EditIcon color='primary' />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className='profile-details'>
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color='primary'
              variant='h5'
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio.aboutMe && (
              <Typography variant='body2'>{bio.aboutMe}</Typography>
            )}
            <hr />
            {bio.location && (
              <Fragment>
                <LocationOn color='primary' /> <span>{bio.location}</span>
                <hr />
              </Fragment>
            )}
            {bio.website && (
              <Fragment>
                <LinkIcon color='primary' />
                <a href={bio.website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {bio.website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <Tooltip title='Logout' placement='top'>
            <IconButton onClick={this.handleLogout}>
              <KeyboardReturn color='primary' />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = { uploadImageAction, logoutUserAction };

UserProfileDisplay.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(UserProfileDisplay));
