// @flow
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CandidateDetails from '../components/CandidateDetails';
import apiClient from '../../../utils/apiClient';
import {
  isSetLocationStateSelector,
  locationStateSelector,
} from '../../../redux/selectors/location';

type JobDetailsContainerType = () => React$Node;

const CandiateDetailsContainer: JobDetailsContainerType = () => {
  const location = useSelector(locationStateSelector);

  const isSetLocation = useSelector(isSetLocationStateSelector);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({});

  const [showApplyView, setShowApplyView] = useState(false);

  console.log(job);

  const fetch = useCallback(() => {
    (async () => {
      setLoading(true);

      try {
        if (isSetLocation) {
          const { latitude, longitude } = location;

          const { data } = await apiClient.get(`/candidates/${id}`, {
            params: {
              latitude,
              longitude,
            },
          });

          setJob(data);
        } else {
          toast(
            'Please enable location permission to find matching candidates.',
          );
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isSetLocation, location]);

  const toggleApplyView = useCallback(() => {
    setShowApplyView((state) => !state);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return null;
  }

  return (
    <CandidateDetails
      job={job}
      showApplyView={showApplyView}
      toggleApplyView={toggleApplyView}
    />
  );
};

export default CandiateDetailsContainer;
