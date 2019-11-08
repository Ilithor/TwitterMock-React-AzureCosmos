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
import Grid from '@material-ui/core/Grid';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Redux
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        handle,
        createdAt,
        bio,
        isLoading,
        authenticated,
      },
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
              {bio.aboutMe && <Typography variant='body2'>{bio.aboutMe}</Typography>}
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

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(style)(Profile));
