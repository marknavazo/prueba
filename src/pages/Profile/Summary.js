import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../common/forms/input-types/renderTextField';
import Loading from '../../components/Loading';

class SummaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  componentWillUnmount() {
    // this.props.firebase.users().off();
  }

  render() {
    const { loading } = this.state;
    const { authUser } = this.props;
    if (loading) {
      return <Loading />;
    }

    return (
      <MDBRow id="summary">
        <MDBCol size="12" className="mb50">
          <h2>Perfil</h2>
        </MDBCol>
        <MDBCol size="12">
          <form>
            <div className="form_wrap">
              <div className="form_row">
                <Field
                  name="firstName"
                  component={renderTextField}
                  label="Nombre"
                  val={authUser.providerData[0].displayName}
                  tooltiptitle="title_mandatory"
                  tooltiptext="text_mandatory"
                  readonly="true"
                />
              </div>

              <div className="form_row">
                <Field
                  name="Email"
                  component={renderTextField}
                  val={authUser.providerData[0].email}
                  label="Email"
                  readonly="true"
                />
              </div>

              <div className="form_buttons">
                <button className="btn first" type="submit" disabled>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    );
  }
}

SummaryComponent.propTypes = {
  firebase: PropTypes.object,
  authUser: PropTypes.object,
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

// export default Summary;

const Summary = reduxForm({
  form: 'profileForm',
  enableReinitialize: true,
})(SummaryComponent);

export default compose(connect(mapStateToProps))(Summary);
