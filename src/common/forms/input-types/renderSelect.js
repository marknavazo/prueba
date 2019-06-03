import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const renderSelect = ({
  label,
  input,
  helperText,
  meta: { asyncValidating, touched, error },
  values,
  size,
  val,
  n,
  tooltiptitle,
  tooltiptext,
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
    <div className="form_input form_tooltip">
      <select
        id={n}
        name={n}
        {...custom}
        className={classNames({ size2x: size === '2x' })}
      >
        {values.map((item, i) => (
          <option
            value={item}
            key={`${i + 1}`}
            defaultValue={item === val}
          >
            {item}
          </option>
        ))}
      </select>
      <span className="bottom_border" />
      {tooltiptitle ? (
        <div className="tooltipIcon">
          <i className="fas fa-asterisk" />
          <div className="tooltipText">
            <h5>{tooltiptitle}</h5>
            <p>{tooltiptext}</p>
          </div>
        </div>
      ) : (
        <br />
      )}
    </div>

    <div className="invalid_msg">{error}</div>

    <div
      className={classNames({ helperText: true, active: helperText })}
    >
      <span>{helperText}</span>
    </div>
  </div>
);

renderSelect.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  helperText: PropTypes.string,
  meta: PropTypes.object,
  values: PropTypes.string,
  size: PropTypes.string,
  val: PropTypes.string,
  n: PropTypes.string,
  tooltiptitle: PropTypes.string,
  tooltiptext: PropTypes.string,
};

export default renderSelect;
