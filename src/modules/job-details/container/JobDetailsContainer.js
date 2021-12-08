// @flow
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobDetails from '../components/JobDetails';
import apiClient from '../../../utils/apiClient';
import {
  isSetLocationStateSelector,
  locationStateSelector,
} from '../../../redux/selectors/location';
import { sessionSelector } from '../../../redux/selectors/session';

type JobDetailsContainerType = () => React$Node;

const JobDetailsContainer: JobDetailsContainerType = () => {
  const location = useSelector(locationStateSelector);

  const session = useSelector(sessionSelector);

  const isSetLocation = useSelector(isSetLocationStateSelector);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({});

  const [showApplyView, setShowApplyView] = useState(false);

  const fetch = useCallback(() => {
    (async () => {
      setLoading(true);

      try {
        if (isSetLocation) {
          const { latitude, longitude } = location;

          const { data } = await apiClient.get(`/jobs/${id}`, {
            params: {
              is_applied_by: session.id,
              latitude,
              longitude,
            },
          });

          setJob(data);
        } else {
          toast('Please enable location permission to find matching jobs.');
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isSetLocation, location, session]);

  const toggleApplyView = useCallback(() => {
    setShowApplyView((state) => !state);
  }, []);

  const onConfirmApply = useCallback(() => {
    (async () => {
      try {
        await apiClient.post(`/jobs/${id}/apply`);
        alert('Applied successfully');
        toggleApplyView();
      } catch (e) {
        console.log(e);
        alert('Unable to apply');
      }
    })();
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return null;
  }

  return (
    <JobDetails
      job={job}
      showApplyView={showApplyView}
      toggleApplyView={toggleApplyView}
      onConfirmApply={onConfirmApply}
    />
  );
};

export default JobDetailsContainer;
