import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Textarea
const renderTextarea = ({
  label,
  input,
  helperText,
  n,
  meta: { asyncValidating, touched, error },
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

    <div className="form_textarea">
      <textarea id={n} {...input} {...custom} />
      <span className="bottom_border" />
    </div>

    <div className="invalid_msg">{error}</div>

    <div
      className={classNames({ helperText: true, active: helperText })}
    >
      <span>{helperText}</span>
    </div>
  </div>
);

renderTextarea.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  helperText: PropTypes.string,
  n: PropTypes.string,
  meta: PropTypes.object,
};

export default renderTextarea;
