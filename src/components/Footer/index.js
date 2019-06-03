import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import * as ROUTES from '../../constants/routes';
import Loading from '../Loading';
import GLOBAL from '../../constants/global';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <footer id="footer">
        <MDBContainer>
          <MDBRow>
            <MDBCol size="12" className="text-center">
              <NavLink exact to={ROUTES.HOME}>
                <h3>{`${GLOBAL.TITLE}`}</h3>
              </NavLink>
              <nav className="footer__nav">
                <ul>
                  <li>
                    <Link to={ROUTES.HOME}>Inicio</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.LIST}>Listado de usuarios</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.PROFILE}>Perfil</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.HELP}>Ayuda</Link>
                  </li>
                </ul>
              </nav>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </footer>
    );
  }
}

export default Footer;
