import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const t = 'AUTH_USER_SET';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      const { onSetAuthUser } = this.props;
      onSetAuthUser(JSON.parse(localStorage.getItem('authUser')));
    }

    componentDidMount() {
      const { firebase, onSetAuthUser } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithAuthentication.propTypes = {
    firebase: PropTypes.object,
    onSetAuthUser: PropTypes.func,
  };

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: t, authUser }),
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
