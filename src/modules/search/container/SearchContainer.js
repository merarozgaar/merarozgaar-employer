// @flow
import React, { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search';
import apiClient from '../../../utils/apiClient';
import { useSelector } from 'react-redux';
import {
  isSetLocationStateSelector,
  locationStateSelector,
} from '../../../redux/selectors/location';
import { useParams } from 'react-router-dom';

const SearchContainer = (): React$Node => {
  const location = useSelector(locationStateSelector);

  const { professionID } = useParams();

  const isSetLocation = useSelector(isSetLocationStateSelector);

  const [suggestions, setSuggestions] = useState([]);

  const [results, setResults] = useState([]);

  const search = useCallback(() => {
    (async () => {
      if (isSetLocation) {
        const { latitude, longitude } = location;

        const { data } = await apiClient.get('/candidates/search', {
          params: {
            latitude,
            longitude,
            profession_id: professionID,
          },
        });

        setResults(data);
      } else {
      }
    })();
  }, [isSetLocation, location, professionID]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await apiClient.get('options/professions');
  //
  //       setSuggestions(data);
  //     } catch (e) {}
  //   })();
  // }, []);

  useEffect(() => {
    search();
  }, [search]);

  return <Search suggestions={suggestions} results={results} search={search} />;
};

export default SearchContainer;
