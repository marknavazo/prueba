import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {
  withAuthorization,
  withEmailVerification,
} from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import UserForm from '../../components/UserForm';
import GLOBAL from '../../constants/global';

class UserPage extends Component {
  async componentDidMount() {
    document.title = `${GLOBAL.TITLE} - Edición del usuario`;
    const { firebase, onSetUsers } = this.props;
    firebase.users().on('value', snapshot => {
      onSetUsers(snapshot.val());
    });
  }

  render() {
    return (
      <div id="user">
        <MDBContainer className="margin_bottom">
          <MDBRow>
            <MDBCol size="12" className="text-left mb50">
              <h2>Edición de usuario</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="12">
              <UserForm />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

UserPage.propTypes = {
  firebase: PropTypes.object,
  onSetUsers: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(UserPage);
