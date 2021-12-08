// @flow
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGeolocation } from 'react-use';
import Layout from '../components/Layout';
import { setLocation } from '../../redux/modules/location';
import useGoogleMaps from '../../hooks/useGoogleMaps';
import { locationStateSelector } from '../../redux/selectors/location';
import { toast } from 'react-toastify';
import { sessionLoggedInSelector } from '../../redux/selectors/session';
import { signOut } from '../../redux/modules/session';

type LayoutContainerType = ({
  children: React$Node,
}) => React$Node;

const LayoutContainer: LayoutContainerType = ({ children }) => {
  const dispatch = useDispatch();

  const location = useSelector(locationStateSelector);

  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const position = useGeolocation();

  console.log(position);

  const { getLocationsByGeocode } = useGoogleMaps();

  const onSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = position;

        if (latitude && longitude) {
          const results = await getLocationsByGeocode(latitude, longitude);

          if (results.length) {
            const {
              address_components,
              formatted_address: description,
              place_id,
            } = results[0];

            if (location?.place_id !== place_id) {
              dispatch(
                setLocation({
                  formatted_address: description,
                  name: address_components?.[0]?.long_name ?? description,
                  place_id,
                  latitude,
                  longitude,
                }),
              );
            }
          }
        } else {
          toast('Unable to detect location, please reload.');
        }
      } catch (e) {}
    })();
  }, [dispatch, location, position]);

  return (
    <Layout isLoggedIn={isLoggedIn} onSignOut={onSignOut}>
      {children}
    </Layout>
  );
};

export default LayoutContainer;
