// @flow
import React, { useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Jobs from '../components/Jobs';
import apiClient from '../../../utils/apiClient';
import { sessionSelector } from '../../../redux/selectors/session';

const JobsContainer = (): React$Node => {
  const { id } = useParams();

  const session = useSelector(sessionSelector);

  const [jobs, setJobs] = useState([]);

  const fetch = useCallback(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(`/jobs/${id}/applications`);

        setJobs(data);
      } catch (e) {}
    })();
  }, []);

  const updateStatus = useCallback(
    ({ status, id }) =>
      () => {
        (async () => {
          try {
            await apiClient.put(`/applications/${id}`, {
              status,
            });

            fetch();
          } catch (e) {}
        })();
      },
    [],
  );

  const onRequestContact = useCallback(
    ({ applicant_id, id, status }) =>
      () => {
        (async () => {
          try {
            const { data } = await apiClient.post(
              `/candidates/${applicant_id}/request-contact`,
              { user_id: session.id },
            );

            confirmAlert({
              title: 'Contact details',
              message: data.mobile_number,
              buttons: [],
            });

            updateStatus({ id, status });
          } catch (e) {}
        })();
      },
    [],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Jobs
      jobs={jobs}
      updateStatus={updateStatus}
      onRequestContact={onRequestContact}
    />
  );
};

export default JobsContainer;
