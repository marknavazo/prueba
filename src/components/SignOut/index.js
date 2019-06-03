import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Cerrar sesión
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.object,
};

export default withFirebase(SignOutButton);
