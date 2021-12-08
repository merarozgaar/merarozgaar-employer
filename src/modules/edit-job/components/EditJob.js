// @flow
import React, { useMemo } from 'react';
import Dropdown from '../../../components/Dropdown';
import type { FormProps } from '../../../hooks/useForm';
import Input from '../../../components/Input/Input';
import LocationInput from '../../../components/LocationInput';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type EditJobType = ({
  ...FormProps,
  professions: Array<Object>,
  jobTypes: Array<Object>,
  salaryFrequencies: Array<Object>,
  qualifications: Array<Object>,
  skills: Array<Object>,
  loading: boolean,
}) => React$Node;

const EditJob: EditJobType = ({
  values: {
    profession_id,
    vacancies,
    address,
    gender,
    min_experience,
    salary,
    salary_frequency,
    benefits,
    start_day,
    end_day,
    start_time,
    end_time,
  },
  onChange,
  onSubmit,
  getErrors,
  professions,
  loading,
}) => {
  const { t } = useTranslation();

  const selected = localStorage.getItem('i18nextLng') || 'hi';

  const isHindi = selected === 'hi';

  const genderOptions = useMemo(
    () =>
      isHindi
        ? [
            {
              label: 'कोई प्राथमिकता नहीं',
              value: 'कोई प्राथमिकता नहीं',
            },
            {
              label: 'पुस्र्ष',
              value: 'पुस्र्ष',
            },
            {
              label: 'महिला',
              value: 'महिला',
            },
            {
              label: 'अन्य',
              value: 'अन्य',
            },
          ]
        : [
            {
              label: 'No preference',
              value: 'No preference',
            },
            {
              label: 'Male',
              value: 'Male',
            },
            {
              label: 'Female',
              value: 'Female',
            },
            {
              label: 'Other',
              value: 'Other',
            },
          ],
    [],
  );

  const daysOptions = useMemo(
    () =>
      (isHindi
        ? [
            'सोमवार',
            'मंगलवार',
            'बुधवार',
            'गुरुवार',
            'शुक्रवार',
            'शनिवार',
            'रविवार',
          ]
        : [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ]
      ).map((v) => ({ value: v, label: v })),
    [isHindi],
  );

  const frequencyOptions = useMemo(
    () =>
      isHindi
        ? [
            {
              label: 'दैनिक',
              value: 'DAILY',
            },
            {
              label: 'मासिक',
              value: 'MONTHLY',
            },
            {
              label: 'साप्ताहिक',
              value: 'WEEKLY',
            },
          ]
        : [
            {
              label: 'Daily',
              value: 'DAILY',
            },
            {
              label: 'Monthly',
              value: 'MONTHLY',
            },
            {
              label: 'Weekly',
              value: 'WEEKLY',
            },
          ],
    [isHindi],
  );

  return (
    <form onSubmit={onSubmit}>
      <Row>
        <Col md={{ span: 6 }}>
          <Dropdown
            required
            label={t('profession')}
            placeholder={t('profession')}
            name="profession_id"
            value={profession_id}
            options={professions}
            onChange={onChange}
            errors={getErrors('profession_id')}
          />
        </Col>
        <Col md={{ span: 6 }}>
          <Input
            required
            label={t('Vacancies')}
            type="number"
            name="vacancies"
            value={vacancies}
            onChange={onChange}
            errors={getErrors('vacancies')}
            min={1}
          />
        </Col>
      </Row>
      <label className="font-weight-bold text-muted">
        {t('address')} <span className="text-danger">*</span>
      </label>
      <LocationInput
        name="address"
        value={address?.formatted_address}
        onChange={onChange}
      />
      {getErrors('address').map(({ message }, i) => (
        <div key={i} className="mt-n3 mb-3 d-block invalid-feedback">
          {message}
        </div>
      ))}
      <Row>
        <Col>
          <Dropdown
            required
            label={t('Gender preferences')}
            placeholder={t('Gender preferences')}
            name="gender"
            value={gender}
            options={genderOptions}
            onChange={onChange}
            errors={getErrors('gender')}
          />
        </Col>
        <Col>
          <Input
            type="number"
            label={t('Experience (if any) in years')}
            name="min_experience"
            value={min_experience}
            onChange={onChange}
            errors={getErrors('min_experience')}
            min={0}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            required
            type="number"
            label={t('Salary')}
            name="salary"
            min={0}
            value={salary}
            onChange={onChange}
            errors={getErrors('salary')}
          />
        </Col>
        <Col>
          <Dropdown
            required
            label={t('Salary frequency')}
            placeholder={t('Salary frequency')}
            name="salary_frequency"
            value={salary_frequency}
            options={frequencyOptions}
            onChange={onChange}
            errors={getErrors('salary_frequency')}
          />
        </Col>
      </Row>
      <Input
        type="textarea"
        label={t('Benefits')}
        name="benefits"
        value={benefits}
        onChange={onChange}
        errors={getErrors('benefits')}
      />
      <Row>
        <Col>
          <Dropdown
            required
            label={t('Start day')}
            placeholder={t('Start day')}
            name="start_day"
            value={start_day}
            options={daysOptions}
            onChange={onChange}
            errors={getErrors('start_day')}
          />
        </Col>
        <Col>
          <Dropdown
            required
            label={t('End day')}
            placeholder={t('End day')}
            name="end_day"
            value={end_day}
            options={daysOptions}
            onChange={onChange}
            errors={getErrors('end_day')}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            required
            type="time"
            label={t('Start time')}
            name="start_time"
            value={start_time}
            onChange={onChange}
            errors={getErrors('start_time')}
          />
        </Col>
        <Col>
          <Input
            required
            type="time"
            label={t('End time')}
            name="end_time"
            value={end_time}
            onChange={onChange}
            errors={getErrors('end_time')}
          />
        </Col>
      </Row>
      <Button className="px-5" type="submit" disabled={loading}>
        {t('Save')}
      </Button>
    </form>
  );
};

export default EditJob;
