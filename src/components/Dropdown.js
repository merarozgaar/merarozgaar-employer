// @flow
import React from 'react';
import isEmpty from 'lodash.isempty';

type DropdownType = ({
  label?: string,
  name: string,
  value: string | number,
  options: Array<{ value: string, label: string }>,
  placeholder?: string,
  required?: boolean,
  onChange: (string, string | number) => void,
  errors: Array<{ name: string, message: string }>,
}) => React$Node;

const Dropdown: DropdownType = ({
  label,
  name,
  value = '',
  options = [],
  placeholder,
  required,
  onChange,
  errors = [],
}) => {
  const handleChange = ({ target: { name, value } }) => {
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <div className="form-group">
      {label && (
        <label className="font-weight-bold text-muted" htmlFor={name}>
          {label} {required ? <span className="text-danger">*</span> : null}
        </label>
      )}
      <select
        className={`form-control ${isEmpty(errors) ? '' : 'is-invalid'}`}
        id={name}
        name={name}
        value={value}
        // required={required}
        onChange={handleChange}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {/* {placeholder && <option value="" />} */}
        {options.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors.map(({ message }, i) => (
        <div key={i} className="invalid-feedback">
          {message}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
