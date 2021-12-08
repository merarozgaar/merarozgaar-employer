// @flow
import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

type Props = {
  name: string,
  value: string,
  onChange: (string, {}) => void,
};

const LocationInput = ({
  name,
  value = '',
  onChange,
  ...rest
}: Props): React$Node => {
  const [address, setAddress] = useState(value);

  useEffect(() => {
    setAddress(value);
  }, [value]);

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);

      const address = results[0];

      const { lat: latitude, lng: longitude } = await getLatLng(address);

      const { formatted_address = value } = address;

      handleChange(formatted_address);

      if (onChange) {
        onChange(name, { address: formatted_address, latitude, longitude });
      }
    } catch (e) {}
  };

  const searchOptions = {
    types: ['(cities)'],
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="position-relative form-group">
          <input
            {...getInputProps({
              ...rest,
              className: 'form-control',
              type: 'search',
            })}
          />
          {suggestions.length ? (
            <div
              className="d-block w-100 dropdown-menu shadow"
              style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: `dropdown-item ${
                      suggestion.active ? 'active' : ''
                    }`,
                    style: {
                      whiteSpace: 'unset',
                      cursor: 'pointer',
                    },
                  })}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationInput;
