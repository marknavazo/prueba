import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const renderTextField = ({
  label,
  input,
  helperText,
  meta: { asyncValidating, touched, error },
  tooltiptitle,
  tooltiptext,
  n,
  val,
  readonly,
  ...custom
}) => (
  <div
    className={classNames({
      async_validating: asyncValidating,
      form_item: true,
      invalid: touched && error,
      dirty: touched,
    })}
  >
    <div className="form_label">
      <label htmlFor={n}>{label}</label>
    </div>

    {readonly === 'true' ? (
      <div className="readonly__input">{val}</div>
    ) : (
      <div className="form_input form_tooltip">
        <input
          id={n}
          {...input}
          {...custom}
          placeholder={label}
          value={val}
        />
        <span className="bottom_border" />
        {tooltiptitle ? (
          <div className="tooltipIcon">
            <i className="fas fa-asterisk" />
            <div
              className={`tooltipText ${!val ? 'show' : 'hidden'}`}
            >
              <h5>{tooltiptitle}</h5>
              <p>{tooltiptext}</p>
            </div>
          </div>
        ) : (
          <br />
        )}
      </div>
    )}

    <div className="invalid_msg">{error}</div>

    <div
      className={classNames({ helperText: true, active: helperText })}
    >
      <span>{helperText}</span>
    </div>
  </div>
);

renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  helperText: PropTypes.string,
  meta: PropTypes.object,
  tooltiptitle: PropTypes.string,
  tooltiptext: PropTypes.string,
  n: PropTypes.string,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readonly: PropTypes.string,
};

export default renderTextField;
