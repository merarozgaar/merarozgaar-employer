// @flow
import React from 'react';
import type { FormProps } from '../../../hooks/useForm';
import Input from '../../../components/Input/Input';
import Dropdown from '../../../components/Dropdown';
import LocationInput from '../../../components/LocationInput';
import { Button, Col, FormLabel, Row } from 'react-bootstrap';

type EditProfileType = ({
  ...FormProps,
  loading: boolean,
  companySizes: Array<Object>,
  industries: Array<Object>,
}) => React$Node;

const EditProfile: EditProfileType = ({
  values: {
    avatar_data_uri,
    company_size_id,
    email,
    industry_type_id,
    name,
    overview,
    website,
    address,
  },
  onChange,
  onSubmit,
  getErrors,
  loading,
  companySizes,
  industries,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name of employer"
        errors={getErrors('name')}
      />
      <Input
        name="overview"
        value={overview}
        onChange={onChange}
        placeholder="Company name"
        errors={getErrors('overview')}
      />
      <Row>
        <Col>
          <Dropdown
            placeholder="Company size"
            name="company_size_id"
            value={company_size_id}
            options={companySizes}
            onChange={onChange}
            errors={getErrors('company_size_id')}
          />
        </Col>
        <Col>
          <Dropdown
            placeholder="Industry"
            name="industry_type_id"
            value={industry_type_id}
            options={industries}
            onChange={onChange}
            errors={getErrors('industry_type_id')}
          />
        </Col>
      </Row>
      <LocationInput
        name="address"
        placeholder="Address"
        value={address?.formatted_address}
        onChange={onChange}
      />
      <div className="pt-3">
        <Button
          className="px-5 font-weight-bold rounded-pill"
          disabled={loading}
          type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
