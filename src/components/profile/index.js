import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import UserProfileDisplay from './user';
import DefaultProfileDisplay from './default';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import style from '../../style/style';

// Redux
import { connect } from 'react-redux';

/** View component for displaying either the default or user profile
 * @param {IProfileComponentProps} props
 */
class Profile extends Component {
  render() {
    const {
      user: { isLoading, authenticated },
    } = this.props;

    let profileMarkup = !isLoading ? (
      authenticated ? (
        <UserProfileDisplay />
      ) : (
        <DefaultProfileDisplay />
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

/** Component representing either default or user profile
 * @param {{profile:IProfile}} props
 */
export default connect(mapStateToProps)(withStyles(style)(Profile));

/** Props passed to the Profile view component
 * @typedef IProfileComponentProps
 * @property {object} user
 */

/** Props that represent a profile being rendered.
 * @typedef IProfile
 * @property {boolean} authenticated
 */
