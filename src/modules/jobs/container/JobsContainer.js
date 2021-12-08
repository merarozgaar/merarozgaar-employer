// @flow
import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiClient';
import Jobs from '../components/Jobs';

const JobsContainer = (): React$Node => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get('/employer/jobs');

        setJobs(data);
      } catch (e) {}
    })();
  }, []);

  return <Jobs jobs={jobs} />;
};

export default JobsContainer;
