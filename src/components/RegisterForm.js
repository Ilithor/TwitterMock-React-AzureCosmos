import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../style/style';

// MUI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class RegisterForm extends Component {
  render() {
    return (
      <form noValidate onSubmit={this.props.handleSubmit}>
        <TextField
          id='handle'
          name='handle'
          type='text'
          label='Handle'
          className={this.props.classes.textField}
          helperText={this.props.error.handle}
          error={this.props.error.handle ? true : false}
          value={this.props.handle}
          onChange={this.props.handleChange}
          fullWidth
        />
        <TextField
          id='email'
          name='email'
          type='email'
          label='Email'
          className={this.props.classes.textField}
          helperText={this.props.error.email}
          error={this.props.error.email ? true : false}
          value={this.props.email}
          onChange={this.props.handleChange}
          fullWidth
        />
        <TextField
          id='password'
          name='password'
          type='password'
          label='Password'
          className={this.props.classes.textField}
          helperText={this.props.error.password}
          error={this.props.error.password ? true : false}
          value={this.props.password}
          onChange={this.props.handleChange}
          fullWidth
        />
        <TextField
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          className={this.props.classes.textField}
          helperText={this.props.error.confirmPassword}
          error={this.props.error.confirmPassword ? true : false}
          value={this.props.confirmPassword}
          onChange={this.props.handleChange}
          fullWidth
        />
        {this.props.error.general && (
          <Typography
            variant='body2'
            className={this.props.classes.customError}
          >
            {this.props.error.general}
          </Typography>
        )}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={this.props.classes.button}
          disabled={this.props.isLoading}
        >
          Register
          {this.props.isLoading && (
            <CircularProgress
              size={30}
              className={this.props.classes.progress}
            />
          )}
        </Button>
        <br />
        <small>
          Already have an account? Login <Link to='/login'>here</Link>
        </small>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(RegisterForm);
