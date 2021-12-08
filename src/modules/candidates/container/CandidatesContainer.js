// @flow
import React, { useCallback, useEffect, useState } from 'react';
import useGoogleMaps from '../../../hooks/useGoogleMaps';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  isSetLocationStateSelector,
  locationStateSelector,
} from '../../../redux/selectors/location';
import apiClient from '../../../utils/apiClient';
import Candidates from '../components/Candidates';

type JobsContainerType = () => React$Node;

const CandidatesContainer: JobsContainerType = () => {
  const location = useSelector(locationStateSelector);

  const isSetLocation = useSelector(isSetLocationStateSelector);

  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);

  const fetch = useCallback(() => {
    (async () => {
      setLoading(true);

      try {
        if (isSetLocation) {
          const { latitude, longitude } = location;

          const { data } = await apiClient.get('/candidates', {
            params: {
              latitude,
              longitude,
            },
          });

          setJobs(data);
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
  }, [isSetLocation, location]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <Candidates jobs={jobs} />;
};

export default CandidatesContainer;
