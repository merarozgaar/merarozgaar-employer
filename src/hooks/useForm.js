// @flow
import { useCallback, useEffect, useState } from 'react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import isFunction from 'lodash.isfunction';
import set from 'lodash.set';
import { getErrorMessage } from '../utils/contentProviders';

type CommonTypes = {
  onSubmit: Function,
};

export type FormConfig = {
  ...CommonTypes,
  initialValues: Object,
  validations: Function | Object,
};

export type FormProps = {
  ...CommonTypes,
  values: Object,
  errors: Array<{ name: string, message: string }>,
  validate: Function,
  onChange: Function,
  getErrors: Function,
  reset: Function,
  setValues: Function,
};

const useForm: (FormConfig) => FormProps = (config) => {
  const { initialValues = {}, onSubmit } = config;

  const selected = localStorage.getItem('i18nextLng') || 'en';

  const isHindi = selected === 'hi';

  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState([]);

  const update = useCallback(
    (name, value) => {
      const newValues = { ...values };
      set(newValues, name, value);
      setValues(newValues);
    },
    [values],
  );

  const isEmptyValue = useCallback((value) => {
    switch (typeof value) {
      case 'boolean':
        return value !== true;

      case 'number': {
        return value >= 0;
      }

      default:
        return isEmpty(value);
    }
  }, []);

  const validate = useCallback(() => {
    const errorsArr = [];

    const { validations } = config;

    const validationsObj = isFunction(validations)
      ? validations(values)
      : validations;

    Object.keys(validationsObj).forEach((key) => {
      const value = get(values, key);

      const validation = get(validationsObj, key);

      if (validation.required && isEmptyValue(value)) {
        errorsArr.push({
          name: key,
          message:
            validation.message || isHindi
              ? 'यह इनपुट आवश्यक है।'
              : getErrorMessage(),
        });
      } else if (validation.rules) {
        validation.rules.every((rule) => {
          const { validator, message } = rule;

          if (!validator(value, values)) {
            errorsArr.push({
              name: key,
              message,
            });

            return false;
          }

          return true;
        });
      }
    });

    setErrors(errorsArr);

    return isEmpty(errorsArr);
  }, [config, isEmptyValue, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors([]);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();

      if (validate()) {
        onSubmit(values, reset);
      }
    },
    [values, reset, onSubmit, validate],
  );

  const getErrors = useCallback(
    (key) => errors.filter(({ name }) => name === key),
    [errors],
  );

  useEffect(() => {
    if (errors.length) {
      const timeout = setTimeout(() => {
        // setErrors([]);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {};
  }, [errors]);

  return {
    values,
    errors,
    validate,
    onChange: update,
    onSubmit: handleSubmit,
    getErrors,
    reset,
    setValues,
  };
};

export default useForm;
