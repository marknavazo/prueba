import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

// const needsEmailVerification = authUser =>
//   authUser &&
//   !authUser.emailVerified &&
//   authUser.providerData
//     .map(provider => provider.providerId)
//     .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    onSendEmailVerification = () => {
      const { firebase } = this.props;
      firebase.doSendEmailVerification();
      // .then(() => this.setState({ isSent: true }));
    };

    render() {
      /* return needsEmailVerification(this.props.authUser) ? (
        <div className="general__container">
          <MDBContainer>
            <MDBRow>
              <MDBCol size="12">
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page
                    once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail or send another
                    confirmation E-Mail.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      ) : (
        <Component {...this.props} />
      ); */
      return <Component {...this.props} />;
    }
  }

  WithEmailVerification.propTypes = {
    firebase: PropTypes.object,
  };

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withFirebase,
    connect(mapStateToProps),
  )(WithEmailVerification);
};

export default withEmailVerification;
