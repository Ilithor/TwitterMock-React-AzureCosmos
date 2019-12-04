import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../style/style';
import UserProfileDisplay from './UserProfileDisplay';
import DefaultProfileDisplay from './DefaultProfileDisplay';

// Redux
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const {
      user,
      classes,
    } = this.props;
    const { isLoading, authenticated } = user;
    let profileMarkup = !isLoading ? (
      authenticated ? (
        <UserProfileDisplay classes={classes} user={user} />
      ) : (
        <DefaultProfileDisplay classes={classes} />
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
};

export default connect(mapStateToProps)(withStyles(style)(Profile));
