// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import Input from '../../../components/Input/Input';
import type { FormProps } from '../../../hooks/useForm';
import { useTranslation } from 'react-i18next';

type SignInType = ({
  ...FormProps,
  loading: boolean,
  requestOtp: Function,
  verifyOtp: Function,
}) => React$Node;

const SignIn: SignInType = ({
  values: { mobile_number, otp, step },
  onChange,
  onSubmit,
  getErrors,
  loading,
  requestOtp,
  verifyOtp,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      {step === 1 ? (
        <>
          <Input
            type="tel"
            name="mobile_number"
            value={mobile_number}
            onChange={onChange}
            label={t('mobileNumber')}
            // placeholder={t('mobileNumber')}
            errors={getErrors('mobile_number')}
          />
        </>
      ) : (
        <>
          <Input
            type="otp"
            name="otp"
            value={otp}
            onChange={onChange}
            placeholder="OTP"
            errors={getErrors('otp')}
            helpText={`Enter the 6-digit OTP we sent to ${mobile_number}.`}
          />
        </>
      )}
      <div className="pt-3">
        <Button
          type="button"
          id="signin-button"
          className="px-5 font-weight-bold rounded-pill"
          disabled={loading}
          onClick={step === 1 ? requestOtp : verifyOtp}>
          {step === 1 ? t('proceed') : t('verify')}
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
