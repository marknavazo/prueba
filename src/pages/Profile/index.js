import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {
  withAuthorization,
  withEmailVerification,
} from '../../components/Session';

import Summary from './Summary';

import * as ROUTES from '../../constants/routes';
import Loading from '../../components/Loading';
import GLOBAL from '../../constants/global';

function getSize(url, providerId) {
  if (providerId === 'facebook.com') {
    return `${url}/picture?type=large`;
  }
  if (providerId === 'twitter.com') {
    return url.replace('_normal', '');
  }
  return url;
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    document.title = `${GLOBAL.TITLE} - Perfil del usuario`;
    /* this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());
    }); */
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  render() {
    const { loading } = this.state;
    const { authUser } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div id="profile">
        <MDBContainer className="margin_bottom">
          <MDBRow>
            <MDBCol xl="3" lg="3" md="3" xs="12">
              <div className="leftImage">
                <div className="content_block">
                  <div className="edit-image">
                    <img
                      src={getSize(
                        authUser.providerData[0].photoURL,
                        authUser.providerData[0].providerId,
                      )}
                      className="imgFull"
                      alt={authUser.providerData[0].displayName}
                    />
                  </div>
                </div>
              </div>
            </MDBCol>
            <MDBCol xl="9" lg="9" md="9" xs="12">
              <Switch>
                <Route
                  exact
                  path={ROUTES.PROFILE}
                  component={Summary}
                />
              </Switch>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  firebase: PropTypes.object,
  authUser: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition),
)(ProfilePage);
