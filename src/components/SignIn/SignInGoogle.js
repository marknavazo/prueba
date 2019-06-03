import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const ERROR_CODE_ACCOUNT_EXISTS = `
  auth/account-exists-with-different-credential
`;

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit = event => {
    const { firebase, history } = this.props;
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="transparent_button">
          <i className="fab fa-google" />
          <button type="submit" className="hidden__button">
            Sign In with Google
          </button>
        </div>
        {error && <p className="error">{error.message}</p>}
      </form>
    );
  }
}

SignInGoogleBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object,
};

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInGoogle;
