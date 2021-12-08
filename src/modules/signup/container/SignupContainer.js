// @flow
import React, { useCallback, useState } from 'react';
import Signup from '../components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { sessionLoggedInSelector } from '../../../redux/selectors/session';
import { useHistory } from 'react-router-dom';
import type { FormConfig } from '../../../hooks/useForm';
import { isValidMobileNumber } from '../../../utils/validations';
import { getAppRoutes, getErrorMessage } from '../../../utils/contentProviders';
import useForm from '../../../hooks/useForm';
import apiClient from '../../../utils/apiClient';
import { signIn } from '../../../redux/modules/session';
import { getMobileNumberOnly } from '../../../utils';
import { isProfileSetupSelector } from '../../../redux/selectors/profile';

type SignupContainerType = () => React$Node;

const SignupContainer: SignupContainerType = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const isProfileSetup = useSelector(isProfileSetupSelector);

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const formConfig: FormConfig = {
    initialValues: {
      dial_code: '+91',
      mobile_number: '',
      name: '',
      otp: '',
      step: 1,
      acceptedTnC: true,
    },
    validations: ({ step }) => ({
      name: {
        required: step === 1,
        message: 'Name is required.',
      },
      mobile_number: {
        required: step === 1,
        message: 'Mobile number is required.',
        rules: [
          {
            validator: (value) => isValidMobileNumber(value.replace(/ /gi, '')),
            message: getErrorMessage('error', 'phoneNumber'),
          },
        ],
      },
      otp: {
        required: step === 2,
        message: 'OTP is required.',
        ...(step === 2
          ? {
              rules: [
                {
                  validator: (value) => value.length === 6,
                  message: getErrorMessage('error', 'otp'),
                },
              ],
            }
          : {}),
      },
    }),
    onSubmit: () => {},
  };

  const formProps = useForm(formConfig);

  const { setValues, validate, values } = formProps;

  const onRequestOtp = useCallback(() => {
    if (validate()) {
      setLoading(true);

      (async () => {
        const { dial_code, mobile_number, name } = values;

        const mobileNumber = getMobileNumberOnly(mobile_number);

        try {
          const {
            data: { is_existing_user },
          } = await apiClient.post('auth/check_existing_user', {
            dial_code,
            mobile_number: mobileNumber,
          });

          if (is_existing_user) {
            alert('You are already registered. Please login to your account.');
          } else {
            await apiClient.post('/auth/signup', {
              name,
              mobile_number: mobileNumber,
              dial_code,
              role: 'EMPLOYER',
            });

            await apiClient.post('auth/request_otp', {
              dial_code,
              mobile_number: mobileNumber,
            });

            setValues({ ...values, step: 2 });
          }
        } catch (e) {
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [setValues, validate, values]);

  const onVerifyOtp = useCallback(() => {
    if (validate()) {
      setLoading(true);

      (async () => {
        try {
          const { dial_code, mobile_number, otp } = values;

          const { data } = await apiClient.post('auth/verify_otp', {
            dial_code,
            mobile_number: getMobileNumberOnly(mobile_number),
            otp,
          });

          dispatch(signIn(data));

          if (isProfileSetup) {
            history.push(getAppRoutes().home);
          } else {
            history.push(getAppRoutes().onboarding);
          }
        } catch (e) {
          console.log(e.response);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, history, isProfileSetup, validate, values]);

  return (
    <Signup
      {...formProps}
      loading={loading}
      requestOtp={onRequestOtp}
      verifyOtp={onVerifyOtp}
    />
  );
};

export default SignupContainer;
