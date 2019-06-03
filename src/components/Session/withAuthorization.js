import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.LANDING);
          }
        },
        () => history.push(ROUTES.LANDING),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.props;
      return condition(authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  WithAuthorization.propTypes = {
    firebase: PropTypes.object,
    history: PropTypes.object,
    authUser: PropTypes.object,
  };

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;
