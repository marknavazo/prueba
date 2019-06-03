import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../common/forms/input-types/renderTextField';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Loading from '../Loading';
import My404Component from '../../pages/My404Component';
import * as ROUTES from '../../constants/routes';
import GLOBAL from '../../constants/global';

let userData;
let errorMail = '';
let method = 'POST';

class UserFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submit: false,
      status: 0,
      user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
      },
    };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
  }

  async componentDidMount() {
    const { firebase, onSetUsers, match } = this.props;
    firebase.users().on('value', snapshot => {
      onSetUsers(snapshot.val());
    });
    if (match.params.id) {
      this.getUser(match.params.id);
      method = 'PUT';
    } else {
      method = 'POST';
      this.setState({ loading: false });
    }
  }

  async getUser(idUser) {
    const url = `${GLOBAL.API_URL}/users/${idUser}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false });
        userData = data.data;
        this.loadData();
      });
  }

  handleClick = idUser => {
    const url = `${GLOBAL.API_URL}/users/${idUser}`;
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(url, requestOptions)
      .then(response => response.status)
      .then(() => this.redirect());
  };

  handleChangeUser(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    const aux = user;
    aux[name] = value;
    this.setState(aux);
  }

  redirect() {
    const { history } = this.props;
    history.push(ROUTES.LIST);
  }

  async loadData() {
    const { user } = this.state;
    const aux = user;
    if (userData) {
      if (userData.id) aux.id = userData.id;
      if (userData.first_name) aux.first_name = userData.first_name;
      if (userData.last_name) aux.last_name = userData.last_name;
      if (userData.email) aux.email = userData.email;
      if (userData.avatar) {
        aux.avatar = userData.avatar;
      }
    }
    this.setState(aux);
  }

  async handleSubmitUser(e) {
    e.preventDefault();
    this.setState({ submit: true });
    const { user } = this.state;

    if (user && this.validMail() && this.validInputs()) {
      const json = JSON.stringify(user);
      this.setState({ saving: true });
      const url = `${GLOBAL.API_URL}/users/${user.id}`;
      const requestOptions = {
        method,
        body: json,
      };

      fetch(url, requestOptions)
        .then(response => response.status)
        .then(data => this.setState({ status: data }));
    }
    this.setState({ saving: false });
  }

  validInputs() {
    const { user } = this.state;
    if (!user.first_name) return false;
    if (!user.last_name) return false;
    return true;
  }

  validMail() {
    const { user } = this.state;
    if (user.email) {
      /* eslint-disable */
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      /* eslint-enable */
      if (!re.test(String(user.email).toLowerCase())) {
        errorMail = 'email erroneo';
        return false;
      }
    } else if (user.email === '') {
      errorMail = 'el email es obligatorio';
      return false;
    }

    return true;
  }

  render() {
    const { user, loading, saving, status, submit } = this.state;
    if (loading) {
      return <Loading />;
    }

    if (!userData && method === 'PUT') {
      return <My404Component />;
    }

    return (
      <div>
        {user.avatar && (
          <img src={user.avatar} alt={user.first_name} />
        )}
        <div className="user__data">
          <form onSubmit={this.handleSubmitUser}>
            <div className="form_wrap">
              {method === 'PUT' && (
                <div className="form_row">
                  <Field
                    name="id"
                    component={renderTextField}
                    label="Id usuario"
                    val={user.id}
                    onChange={this.handleChangeUser}
                    tooltiptitle="Campo obligatorio"
                    tooltiptext="El id es obligatorio"
                    readonly="true"
                  />
                </div>
              )}
              <div className="form_row">
                <Field
                  name="first_name"
                  component={renderTextField}
                  label="Nombre"
                  val={user.first_name}
                  onChange={this.handleChangeUser}
                  tooltiptitle="El nombre es obligatorio"
                  tooltiptext="El campo no puede estar vacío"
                />

                {submit && !user.first_name && (
                  <i className="fal fa-exclamation-circle" />
                )}
                {submit && !user.first_name && (
                  <div className="mandatory">
                    El nombre es obligatorio
                  </div>
                )}
              </div>
              <div className="form_row">
                <Field
                  name="last_name"
                  component={renderTextField}
                  label="Apellidos"
                  val={user.last_name}
                  onChange={this.handleChangeUser}
                  tooltiptitle="Los apellidos son obligatorios"
                  tooltiptext="El campo no puede estar vacío"
                />

                {submit && !user.last_name && (
                  <i className="fal fa-exclamation-circle" />
                )}
                {submit && !user.last_name && (
                  <div className="mandatory">
                    Los apellidos son obligatorios
                  </div>
                )}
              </div>
              <div className="form_row">
                <Field
                  name="email"
                  component={renderTextField}
                  label="Email"
                  val={user.email}
                  onChange={this.handleChangeUser}
                  tooltiptitle="El Email es obligatorio"
                  tooltiptext="El campo no puede estar vacío"
                />

                {submit && !this.validMail() && errorMail && (
                  <i className="fal fa-exclamation-circle" />
                )}
                {submit && !this.validMail() && errorMail && (
                  <div className="mandatory">{errorMail}</div>
                )}
              </div>
              <div className="form_buttons">
                <button
                  className="btn delete"
                  onClick={() => {
                    this.handleClick(user.id);
                  }}
                  type="button"
                >
                  Eliminar
                </button>
                <button className="btn first" type="submit">
                  Guardar
                </button>
              </div>
              {saving && <Loading additionalclass="smallLoading" />}
              {status === 200 && (
                <div className="user__ok">Usuario actualizado</div>
              )}
              {status === 201 && (
                <div className="user__ok">Usuario creado</div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UserFormComponent.propTypes = {
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

const UserForm = reduxForm({
  form: 'userForm',
  enableReinitialize: true,
})(UserFormComponent);

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(UserForm);
