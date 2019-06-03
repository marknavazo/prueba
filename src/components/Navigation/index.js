import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { elastic as Menu } from 'react-burger-menu';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Loading from '../Loading';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import GLOBAL from '../../constants/global';

const Navigation = ({ authUser }) => (
  <NavigationAuth authUser={authUser} />
);

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  initials = user => {
    let initials = '';
    const words = user.toUpperCase().split(' ');
    words.map(item => {
      initials += item.substr(0, 1);
      return true;
    });
    return initials;
  };

  render() {
    const { loading } = this.state;
    const { authUser } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <header id="menu-auth">
        <Menu right>
          <NavLink
            className="menu-item"
            exact
            to={ROUTES.HOME}
            activeClassName="selected"
          >
            Inicio
          </NavLink>
          <NavLink
            className="menu-item"
            exact
            to={ROUTES.PROFILE}
            activeClassName="selected"
          >
            Perfil
          </NavLink>
          <NavLink
            className="menu-item"
            exact
            to={ROUTES.LIST}
            activeClassName="selected"
          >
            Lista de usuarios
          </NavLink>
        </Menu>
        <MDBContainer>
          <MDBRow>
            <MDBCol size="12">
              <NavLink exact to={ROUTES.LANDING}>
                <h1>{`${GLOBAL.TITLE}`}</h1>
              </NavLink>
              {authUser && (
                <nav className="left__menu" id="left-menu">
                  <ul>
                    <li>
                      <NavLink
                        exact
                        to={ROUTES.HOME}
                        activeClassName="selected"
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to={ROUTES.LIST}
                        activeClassName="selected"
                      >
                        Listado de usuarios
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              )}
              {authUser && (
                <nav className="right__menu" id="right-menu">
                  <div className="profile">
                    <div className="name">
                      <i className="fas fa-caret-down" />
                      {this.initials(authUser.username)}
                    </div>
                    <ul>
                      <li>
                        <Link to={ROUTES.PROFILE}>Perfil</Link>
                      </li>
                      <li>
                        <Link to={ROUTES.HELP}>Ayuda</Link>
                      </li>
                      <li className="session">
                        <SignOutButton />
                      </li>
                    </ul>
                  </div>
                </nav>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </header>
    );
  }
}

Navigation.propTypes = {
  authUser: PropTypes.object,
};

NavigationAuth.propTypes = {
  authUser: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
