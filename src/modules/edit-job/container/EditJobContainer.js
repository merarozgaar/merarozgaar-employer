// @flow
import React, { useEffect, useState } from 'react';
import allSettled from 'promise.allsettled';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import apiClient from '../../../utils/apiClient';
import EditJob from '../components/EditJob';
import useGoogleMaps from '../../../hooks/useGoogleMaps';
import useForm from '../../../hooks/useForm';
import type { FormConfig } from '../../../hooks/useForm';
import { getAppRoutes } from '../../../utils/contentProviders';

const EditJobContainer = (): React$Node => {
  const { getLocationsByGeocode, getLocationByPlaceID } = useGoogleMaps();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [jobTypes, setJobTypes] = useState([]);

  const [professions, setProfessions] = useState([]);

  const [salaryFrequencies, setSalaryFrequencies] = useState([]);

  const [qualifications, setQualifications] = useState([]);

  const [skills, setSkills] = useState([]);

  const selected = localStorage.getItem('i18nextLng') || 'en';

  const isHindi = selected === 'hi';

  const formConfig: FormConfig = {
    initialValues: {
      address: {},
      benefits: '',
      description: '',
      education_id: '',
      gender: '',
      location_type: '',
      min_age: '',
      min_experience: '',
      profession_id: '',
      salary: '',
      salary_frequency: '',
      title: '',
      type_id: '',
      vacancies: '',
      start_time: '',
      end_time: '',
      start_day: '',
      end_day: '',
    },
    validations: ({ start_time }) => ({
      profession_id: {
        required: true,
      },
      vacancies: {
        required: true,
      },
      gender: {
        required: true,
      },
      salary: {
        required: true,
        rules: [
          {
            validator: (value) => (value < 0 ? false : true),
            message: isHindi
              ? 'यह एक अमान्य मान है।'
              : 'This is an invalid value.',
          },
        ],
      },
      salary_frequency: {
        required: true,
      },
      start_day: {
        required: true,
      },
      end_day: {
        required: true,
      },
      start_time: {
        required: true,
      },
      end_time: {
        required: true,
        rules: [
          {
            validator: (value) =>
              moment(value).isBefore(moment(start_time)) ? false : true,
            message: isHindi
              ? 'यह इनपुट आवश्यक है।'
              : 'End time cannot be earlier than start time.',
          },
        ],
      },
      address: {
        rules: [
          {
            validator: (value) => (isEmpty(value) ? false : true),
            message: isHindi
              ? 'यह इनपुट आवश्यक है।'
              : 'This input is required.',
          },
        ],
      },
    }),
    onSubmit: (values) => {
      (async () => {
        console.log({ values });

        setLoading(true);

        try {
          const { start_day, end_day, start_time, end_time } = values;

          const { address } = values;

          const { latitude, longitude } = address;

          const results = await getLocationsByGeocode(latitude, longitude);

          if (results.length) {
            const { place_id } = results[0];

            const address = await getLocationByPlaceID(place_id);

            const payload = {
              ...values,
              address,
            };

            if (start_time !== '' && end_time) {
              payload.timings = `${moment(start_time).format(
                'hh:mm A',
              )}-${moment(end_time).format('hh:mm A')}`;
            } else {
              payload.timings = '';
            }

            if (start_day !== '' && end_day !== '') {
              payload.working_days = `${start_day} to ${end_day}`;
            } else {
              payload.working_days = '';
            }

            await apiClient.post('/jobs', payload);

            alert(
              isHindi
                ? 'आपकी जॉब पोस्टिंग अगले तीन घंटे में लाईव हो जाएगीl'
                : 'Your job posting be live in the next 3 hours.',
            );

            history.push(getAppRoutes().jobs);
          } else {
            alert('Unable to read location.');
          }
        } catch (e) {
          alert('Something went wrong!');
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
            endpoint: '/options/job_types',
            setter: setJobTypes,
          },
          {
            endpoint: '/options/professions',
            setter: setProfessions,
          },
          {
            endpoint: '/options/qualifications',
            setter: setQualifications,
          },
          {
            endpoint: '/options/salary_frequencies',
            setter: setSalaryFrequencies,
          },
          {
            endpoint: '/options/skills',
            setter: setSkills,
          },
        ];

        const promises = options.map(
          ({ endpoint, setter }) =>
            new Promise((resolve, reject) => {
              (async () => {
                try {
                  const { data } = await apiClient.get(endpoint, {
                    params: {
                      lang: { en: 'ENGLISH', hi: 'HINDI' }[selected],
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
    <EditJob
      {...formProps}
      professions={professions}
      jobTypes={jobTypes}
      salaryFrequencies={salaryFrequencies}
      qualifications={qualifications}
      skills={skills}
      loading={loading}
    />
  );
};

export default EditJobContainer;
