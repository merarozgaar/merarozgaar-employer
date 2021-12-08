// @flow
import { useCallback } from 'react';
import axios from 'axios';
import apiClient from '../utils/apiClient';

type UseGeolocationType = () => {
  getLocationsByGeocode: Function,
  getLocationPredictions: Function,
  getLocationByPlaceID: Function,
};

const useGoogleMaps: UseGeolocationType = () => {
  const appLanguage = 'ENGLISH';

  const getLocationsByGeocode = useCallback(
    (latitude, longitude) =>
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const data = await axios.get(
              'https://maps.googleapis.com/maps/api/geocode/json',
              {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                  result_type: 'locality|sublocality|postal_code|country',
                  language: { HINDI: 'hi', ENGLISH: 'en' }[appLanguage],
                },
              },
            );

            const {
              data: { results = [] },
            } = data;

            resolve(results);
          } catch (e) {
            reject(e);
          }
        })();
      }),
    [appLanguage],
  );

  const getLocationPredictions = useCallback(
    (query) =>
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const {
              data: { predictions = [] },
            } = await axios.get(
              'https://maps.googleapis.com/maps/api/place/autocomplete/json',
              {
                params: {
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                  input: query,
                  language: { HINDI: 'hi', ENGLISH: 'en' }[appLanguage],
                },
              },
            );

            resolve(predictions);
          } catch (e) {
            reject(e);
          }
        })();
      }),
    [appLanguage],
  );

  const extractAddressComponent = useCallback((addressComponents, type) => {
    try {
      const matches =
        addressComponents.filter(({ types = [] }) => types.includes(type)) ??
        [];

      if (matches.length) {
        const { long_name } = matches[0];

        return long_name;
      }
    } catch (e) {
      return '';
    }
  }, []);

  const getLocationByPlaceID = useCallback(
    (placeID) =>
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const { data } = await apiClient.get(
               'https://maps.googleapis.com/maps/api/place/details/json',
              //'/location',
              {
                params: {
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                  place_id: placeID,
                  fields: 'address_component,name,geometry,formatted_address',
                  language: { HINDI: 'hi', ENGLISH: 'en' }[appLanguage],
                },
              },
            );

            const { status } = data;

            if (status === 'OK') {
              const {
                result: {
                  address_components = [],
                  geometry,
                  formatted_address = '',
                },
              } = data;

              const payload = {
                city: extractAddressComponent(address_components, 'locality'),
                coordinates: {
                  latitude: geometry?.location?.lat ?? 0,
                  longitude: geometry?.location?.lng ?? 0,
                },
                country: extractAddressComponent(address_components, 'country'),
                state: extractAddressComponent(
                  address_components,
                  'administrative_area_level_1',
                ),
                pin_code:
                  extractAddressComponent(address_components, 'postal_code') ??
                  '',
                locality:
                  [...Array(5).keys()]
                    .map((_, i) =>
                      extractAddressComponent(
                        address_components,
                        `sublocality_level_${i + 1}`,
                      ),
                    )
                    .find(Boolean) ??
                  extractAddressComponent(address_components, 'sublocality') ??
                  '',
                street_address: formatted_address,
              };

              resolve(payload);
            } else {
              reject(status);
            }
          } catch (e) {
            reject(e);
          }
        })();
      }),
    [appLanguage, extractAddressComponent],
  );

  return {
    getLocationsByGeocode,
    getLocationPredictions,
    getLocationByPlaceID,
  };
};

export default useGoogleMaps;
