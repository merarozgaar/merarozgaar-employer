// @flow
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignIn from '../components/Login';
import type { FormConfig, FormProps } from '../../../hooks/useForm';
import useForm from '../../../hooks/useForm';
import { getMobileNumberOnly } from '../../../utils';
import { getAppRoutes, getErrorMessage } from '../../../utils/contentProviders';
import apiClient from '../../../utils/apiClient';
import { isValidMobileNumber } from '../../../utils/validations';
import { setProfile } from '../../../redux/modules/profile';
import { sessionLoggedInSelector } from '../../../redux/selectors/session';
import { toast } from 'react-toastify';
import { signIn } from '../../../redux/modules/session';
import { isProfileSetupSelector } from '../../../redux/selectors/profile';

type SignInContainerType = ({ allowSignIn?: boolean }) => React$Node;

const SignInContainer: SignInContainerType = ({ allowSignIn = true }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const isProfileSetup = useSelector(isProfileSetupSelector);

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const formConfig: FormConfig = {
    initialValues: {
      dial_code: '+91',
      mobile_number: '',
      otp: '',
      step: 1,
      acceptedTnC: true,
    },
    validations: ({ step }) => ({
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

  const formProps: FormProps = useForm(formConfig);

  const { values, onChange, validate } = formProps;

  const requestOtp = useCallback(() => {
    if (validate()) {
      (async () => {
        try {
          const { dial_code, mobile_number } = values;

          const payload = {
            dial_code,
            mobile_number: getMobileNumberOnly(mobile_number),
          };

          const {
            data: { is_existing_user },
          } = await apiClient.post('auth/check_existing_user', payload);

          if (is_existing_user) {
            await apiClient.post('auth/request_otp', payload);

            onChange('step', 2);
          } else {
            alert('You need to register first.');

            history.push(getAppRoutes().signUp);
          }
        } catch (e) {
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [validate, values, onChange]);

  const verifyOtp = useCallback(() => {
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

          const { role, setup_step, token } = data;

          if (role === 'EMPLOYEE') {
            const { data: profile } = await apiClient.get('/employee/profile', {
              headers: {
                Authorization: token,
              },
            });

            dispatch(setProfile(profile));
          } else {
            const { data: profile } = await apiClient.get('/employer/profile', {
              headers: {
                Authorization: token,
              },
            });

            dispatch(setProfile(profile));
          }

          dispatch(signIn(data));
        } catch (e) {
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [validate, values, dispatch]);

  const onSignIn = useCallback(() => {
    if (validate()) {
    }
  }, [validate, allowSignIn, requestOtp]);

  useEffect(() => {
    if (isLoggedIn) {
      if (isProfileSetup) {
        history.push(getAppRoutes().home);
      } else {
        history.push(getAppRoutes().onboarding);
      }
    }
  }, [isLoggedIn, isProfileSetup, history]);

  return (
    <SignIn
      {...formProps}
      loading={loading}
      requestOtp={requestOtp}
      verifyOtp={verifyOtp}
      onSignIn={onSignIn}
    />
  );
};

export default SignInContainer;
