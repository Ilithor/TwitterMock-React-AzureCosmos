import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Redux
import { connect } from 'react-redux';
import {
  logoutUserAction,
  uploadImageAction,
} from '../redux/actions/userActions';

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImageAction(formData);
  };

  handleEditPhoto = () => {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
  };

  render() {
    const {
      classes,
      user: { handle, createdAt, bio, isLoading, authenticated },
    } = this.props;

    let profileMarkup = !isLoading ? (
      authenticated ? (
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
                  <a
                    href={bio.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {' '}
                    {bio.website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color='primary' />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography varian='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
            >
              Register
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = { logoutUserAction, uploadImageAction };

Profile.propTypes = {
  logoutUserAction: PropTypes.func.isRequired,
  uploadImageAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(Profile));
