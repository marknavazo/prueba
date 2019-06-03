import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { NavLink } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdbreact';
import {
  withAuthorization,
  withEmailVerification,
} from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import Loading from '../../components/Loading';
import * as ROUTES from '../../constants/routes';
import GLOBAL from '../../constants/global';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    document.title = `${GLOBAL.TITLE} - Inicio`;
    const { firebase, onSetUsers } = this.props;
    firebase.users().on('value', snapshot => {
      onSetUsers(snapshot.val());
    });
    this.getData();
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  async getData() {
    const format = 'json';
    const league = 1;
    const group = 1;
    const tz = 'Europe/Madrid';
    /* eslint-disable */
    await fetch(
      `${GLOBAL.PROXY}${GLOBAL.URL_API}%3Fkey%3D${
        GLOBAL.KEY
      }%26tz%3D${tz}%26format%3D${format}%26req%3Dtables%26league%26league%3D${league}%26group%3D${group}`,
    )
      .then(response => response.json())
      .then(data => this.setState({ data }));
    /* eslint-enable */
    this.setState({ loading: false });
  }

  render() {
    const { loading, data } = this.state;
    const { authUser } = this.props;

    if (loading) {
      return <Loading />;
    }

    const { table } = data;

    return (
      <div id="home">
        <MDBContainer className="margin_bottom">
          <MDBRow>
            <MDBCol size="3">
              <div className="profile_image">
                <img
                  src="https://picsum.photos/id/180/261/236?blur=5"
                  className="imgFull"
                  alt="Profile"
                />
                <div className="profile_name">
                  <h3>Hola {authUser.username}!</h3>
                </div>
                <div className="profile_text">
                  <NavLink exact to={`${ROUTES.PROFILE}`}>
                    Ver perfil
                  </NavLink>
                </div>
              </div>
            </MDBCol>
            <MDBCol xl="9" lg="9" md="12">
              <MDBRow>
                <MDBCol size="12">
                  <h2>Clasificación</h2>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="12">
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Pos</th>
                        <th>Club</th>
                        <th>PJ</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>Pts</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {table.map((team, index) => (
                        <tr className="team" key={`${index + 1}`}>
                          <td>{team.pos}</td>
                          <td>
                            <img
                              className="team__logo"
                              src={team.shield}
                              alt={team.team}
                            />
                            {team.team}
                          </td>
                          <td>{team.round}</td>
                          <td>{team.wins}</td>
                          <td>{team.draws}</td>
                          <td>{team.losses}</td>
                          <td>{team.gf}</td>
                          <td>{team.ga}</td>
                          <td>{team.points}</td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

HomePage.propTypes = {
  firebase: PropTypes.object,
  onSetUsers: PropTypes.func,
  authUser: PropTypes.object,
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
)(HomePage);
