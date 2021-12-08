// @flow
import React, { useCallback, useState } from 'react';
import isEmpty from 'lodash.isempty';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Icon from '../Icon';
import './styles.scss';
import { months } from '../../utils/contentProviders';

export type Error = Array<{ name: string, message: string }>;

export type Props = {
  type?:
    | 'email'
    | 'search'
    | 'password'
    | 'checkbox'
    | 'file'
    | 'textarea'
    | 'date'
    | 'text'
    | 'tel'
    | 'otp'
    | 'number'
    | 'time',
  errors: Error,
  label?: string | Object,
  name: string,
  value: string | number | Object,
  placeholder?: string,
  required?: boolean,
  accept?: string,
  helpText?: string | React$Node,
  onChange: Function,
  onSearch?: Function,
  className?: string,
};

type InputType = (Props) => React$Node;

const Input: InputType = ({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  required,
  accept,
  helpText,
  onChange,
  onSearch,
  errors = [],
  className = '',
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: any) => {
    const {
      target: { name, value, checked, files },
    } = e;

    if (onChange) {
      switch (type) {
        case 'file':
          onChange(name, files);
          break;

        case 'checkbox':
          onChange(name, checked);
          break;

        default:
          onChange(name, value);
          break;
      }
    }
  };

  const handleReset = () => {
    onChange(name, '');
  };

  const onChangeTime = useCallback(
    (v) => {
      onChange(name, v);
    },
    [onChange],
  );

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const generateInputClassNames = (prefix = 'form-control') =>
    `${prefix} ${className} ${isEmpty(errors) ? '' : 'is-invalid'}`;

  const generateAppendClassNames = () =>
    `btn bg-white text-muted rounded-right ${
      isEmpty(errors) ? 'border border-left-0' : 'border-danger border-left-0'
    }`;

  const renderLabel = () => (
    <>
      {label && (
        <label className="font-weight-bold text-muted" htmlFor={name}>
          {label} {required ? <span className="text-danger">*</span> : null}
        </label>
      )}
    </>
  );

  const renderErrors = () => (
    <>
      {errors.map(({ message }, i) => (
        <div key={i} className="d-block invalid-feedback">
          {message}
        </div>
      ))}
    </>
  );

  const renderHelpText = () => (
    <>
      {helpText && (
        <small id={name} className="form-text text-muted">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {helpText}
        </small>
      )}
    </>
  );

  switch (type) {
    case 'search':
      return (
        <Form.Group className="form-group">
          <div className="input-group">
            <input
              {...rest}
              className={generateInputClassNames()}
              id={name}
              type="search"
              name={name}
              value={value}
              placeholder={placeholder}
              // required={required}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onSearch}>
                <Icon icon="search" />
              </button>
            </div>
            {renderErrors()}
          </div>
        </Form.Group>
      );

    case 'password':
      return (
        <div className="form-group">
          {renderLabel()}
          <div className="input-group">
            <input
              {...rest}
              className={generateInputClassNames()}
              id={name}
              type={passwordVisible ? 'text' : 'password'}
              name={name}
              value={value}
              placeholder={placeholder}
              required={required}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className={generateAppendClassNames()}
                type="button"
                onClick={togglePasswordVisibility}>
                <Icon icon={passwordVisible ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            {renderErrors()}
          </div>
        </div>
      );

    case 'checkbox':
      return (
        <div className="form-group">
          <div className="form-check align-items-center">
            <input
              {...rest}
              className={generateInputClassNames('form-check-input')}
              type="checkbox"
              id={name}
              name={name}
              checked={value}
              required={required}
              onChange={handleChange}
              style={{ marginTop: '9px' }}
            />
            <label className="form-check-label" htmlFor={name}>
              {label}
            </label>
            {renderErrors()}
          </div>
        </div>
      );

    case 'file':
      return (
        <div className="form-group">
          {renderLabel()}
          <div className="custom-file">
            <input
              {...rest}
              className={generateInputClassNames('custom-file-input')}
              id={name}
              type="file"
              name={name}
              value={value}
              placeholder={placeholder}
              required={required}
              accept={accept}
              onChange={handleChange}
            />
            <label className="custom-file-label" htmlFor={name}>
              {placeholder}
            </label>
          </div>
          {renderErrors()}
          {renderHelpText()}
        </div>
      );

    case 'textarea':
      return (
        <div className="form-group">
          {renderLabel()}
          <textarea
            {...rest}
            className={generateInputClassNames()}
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            // required={required}
            onChange={handleChange}
          />
          {renderErrors()}
        </div>
      );

    case 'date': {
      const year = new Date().getFullYear();
      const years = Array.from(new Array(100), (val, index) => year - index);

      const renderHeader = ({
        date,
        decreaseMonth,
        increaseMonth,
        changeMonth,
        changeYear,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <>
          <div className="d-flex justify-content-between align-items-center  pb-1 px-3">
            <Button
              variant="link"
              size="sm"
              className="p-0 text-body"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}>
              <Icon icon="chevron-left" />
            </Button>
            <p className="m-0 h6">{moment(date).format('MMMM YYYY')}</p>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-body"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}>
              <Icon icon="chevron-right" />
            </Button>
          </div>
          <div className="d-flex justify-content-center  mt-0 pt-0 pb-1 px-3">
            <select
              className="custom-select custom-select-sm   mr-1"
              value={months[moment(date).month()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="custom-select custom-select-sm"
              value={years[moment(date).year()]}
              onChange={({ target: { value } }) => changeYear(value)}>
              {years.map((year, i) => (
                <option key={i}>{year}</option>
              ))}
            </select>
          </div>
        </>
      );

      const DatePickerInput = React.forwardRef(
        ({ value, onClick, ...rest }: Object, ref) => (
          <div className="input-group">
            <input
              ref={ref}
              id={name}
              className={generateInputClassNames()}
              value={value}
              placeholder={placeholder}
              autoComplete="off"
              onFocus={onClick}
              onChange={() => {}}
            />
            <div className="input-group-append">
              <button
                className={generateAppendClassNames()}
                type="button"
                onClick={handleReset}>
                {/*<Icon icon={['far', 'times-circle']} />*/}
              </button>
            </div>
            {renderErrors()}
          </div>
        ),
      );

      return (
        <div className="form-group">
          {renderLabel()}
          <DatePicker
            {...rest}
            selected={value}
            onChange={(v) => onChange(name, v)}
            showPopperArrow={false}
            dateFormat="d MMM, yyyy"
            className={generateInputClassNames()}
            calendarClassName="p-3 shadow border-0"
            renderCustomHeader={renderHeader}
            customInput={<DatePickerInput />}
            dropdownMode="select"
          />
        </div>
      );
    }

    case 'tel':
      return (
        <div className="form-group">
          {renderLabel()}
          <InputMask
            mask="+91 *** *** ****"
            formatChars={{
              '*': '[0-9]',
            }}
            permanents={[0, 1, 2, 3]}
            maskChar={null}
            onChange={handleChange}
            value={value}>
            {(props) => (
              <input
                {...props}
                {...rest}
                className={generateInputClassNames()}
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
              />
            )}
          </InputMask>
          {renderErrors()}
          {renderHelpText()}
        </div>
      );

    case 'otp':
      return (
        <div className="form-group">
          {renderLabel()}
          <InputMask
            mask="******"
            formatChars={{
              '*': '[0-9]',
            }}
            maskChar={null}
            onChange={handleChange}
            value={value}>
            {(props) => (
              <input
                {...props}
                {...rest}
                className={generateInputClassNames()}
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
              />
            )}
          </InputMask>
          {renderErrors()}
          {renderHelpText()}
        </div>
      );

    case 'time':
      return (
        <div className="form-group">
          {renderLabel()}
          <TimePicker
            onChange={onChangeTime}
            value={value}
            format="h:mm A"
            use12Hours
            showSecond={false}
            placeholder={placeholder}
            inputReadOnly
            className={generateInputClassNames(
              'd-flex align-items-center py-0 text-reset form-control',
            )}
            popupClassName="bg-white border rounded-0 shadow-sm"
            clearIcon={null}
          />
          {renderErrors()}
          {renderHelpText()}
        </div>
      );

    default:
      return (
        <div className="form-group">
          {renderLabel()}
          <input
            {...rest}
            className={generateInputClassNames()}
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            // required={required}
            onChange={handleChange}
          />
          {renderErrors()}
          {renderHelpText()}
        </div>
      );
  }
};

export default Input;
