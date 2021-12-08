// @flow
import React, { useEffect, useState } from 'react';
import allSettled from 'promise.allsettled';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import EditProfile from '../components/EditProfile';
import type { FormConfig } from '../../../hooks/useForm';
import useForm from '../../../hooks/useForm';
import apiClient from '../../../utils/apiClient';
import useGoogleMaps from '../../../hooks/useGoogleMaps';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSelector } from '../../../redux/selectors/session';
import { setProfile } from '../../../redux/modules/profile';
import { signIn } from '../../../redux/modules/session';
import { getAppRoutes } from '../../../utils/contentProviders';
import { setLocation } from '../../../redux/modules/location';

type EditProfileContainerType = () => React$Node;

const EditProfileContainer: EditProfileContainerType = () => {
  const dispatch = useDispatch();

  const session = useSelector(sessionSelector);

  const history = useHistory();

  const { getLocationsByGeocode, getLocationByPlaceID } = useGoogleMaps();

  const [loading, setLoading] = useState(false);

  const [companySizes, setCompanySizes] = useState([]);

  const [industries, setIndustries] = useState([]);

  const isHindi = false;

  const formConfig: FormConfig = {
    initialValues: {
      avatar_data_uri: '',
      company_size_id: '',
      email: '',
      industry_type_id: '',
      name: '',
      overview: '',
      website: '',
      address: {},
    },
    validations: {
      avatar_data_uri: {
        required: true,
        message: isHindi ? 'लोगो आवश्यक है।' : 'Logo is required.',
      },
      name: {
        required: true,
        message: isHindi
          ? 'नियोक्ता का नाम आवश्यक है।'
          : 'Name of employer is required.',
      },
      company_size_id: {
        required: true,
        message: isHindi
          ? 'कर्मचारियों की संख्या आवश्यक है।'
          : 'Company size is required.',
      },
      industry_type_id: {
        required: true,
        message: isHindi ? 'उद्योग आवश्यक है।' : 'Industry is required.',
      },
      address: {
        rules: [
          {
            validator: (value) => (isEmpty(value) ? false : true),
            message: isHindi ? 'पता आवश्यक है।' : 'Address is required.',
          },
        ],
      },
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);

          const { address } = values;

          const { latitude, longitude } = address;

          const results = await getLocationsByGeocode(latitude, longitude);

          if (results.length) {
            const {
              address_components,
              formatted_address: description,
              place_id,
            } = results[0];

            const location = await getLocationByPlaceID(place_id);

            console.log(place_id, location);

            const payload = {
              ...values,
              avatar_id: 1,
              address: location,
            };

            const { data } = await apiClient.post('/employer/profile', payload);

            console.log(data);

            dispatch(setProfile(data));

            dispatch(signIn({ ...session, name: data.name }));

            history.push(getAppRoutes().home);
          } else {
            alert('Unable to read location.');
          }
        } catch (e) {
        } finally {
          setLoading(false);
        }
      })();
    },
  };

  const formProps = useForm(formConfig);

  useEffect(() => {
    (async () => {
      try {
        const options = [
          {
            endpoint: '/options/company_sizes',
            setter: setCompanySizes,
          },
          {
            endpoint: '/options/industries',
            setter: setIndustries,
          },
        ];

        const promises = options.map(
          ({ endpoint, setter }) =>
            new Promise((resolve, reject) => {
              (async () => {
                try {
                  const { data } = await apiClient.get(endpoint, {
                    params: {
                      lang: 'ENGLISH',
                    },
                  });

                  setter(data);

                  resolve();
                } catch (e) {
                  reject();
                }
              })();
            }),
        );

        await allSettled(promises);
      } catch (e) {}
    })();
  }, []);

  return (
    <EditProfile
      {...formProps}
      loading={loading}
      companySizes={companySizes}
      industries={industries}
    />
  );
};

export default EditProfileContainer;
