// @flow
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Icon from '../../../components/Icon';
import { resolveDynamicPath } from '../../../utils';
import { getAppRoutes } from '../../../utils/contentProviders';

type PropTypes = {
  suggestions: Array<Object>,
  results: Array<Object>,
  search: Function,
};

const Search = ({ suggestions, results, search }: PropTypes): React$Node => {
  const { t } = useTranslation();

  const [query, setQuery] = useState('');

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const matching = useMemo(
    () =>
      query.length
        ? suggestions.filter(({ label }) =>
            new RegExp(`^${query}`, 'i').test(label),
          )
        : [],
    [suggestions, query],
  );

  const handleChange = useCallback(({ target: { value: inputValue } }) => {
    setQuery(inputValue);

    setShowSuggestions(true);
  }, []);

  const handleSelect = useCallback(
    (label, value) => {
      setQuery(label);

      setShowSuggestions(false);

      search(value);
    },
    [search],
  );

  return (
    <Container>
      {/*<Row>*/}
      {/*  <Col md={{ span: 8, offset: 2 }}>*/}
      {/*    <div className="position-relative form-group shadow-sm">*/}
      {/*      <div className="input-group input-group-lg">*/}
      {/*        <div className="input-group-prepend">*/}
      {/*          <div className="px-4 input-group-text bg-white border-0">*/}
      {/*            <Icon icon="search" />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <input*/}
      {/*          className="px-4 form-control form-control-lg border-0"*/}
      {/*          value={query}*/}
      {/*          placeholder={t('Search for candidates')}*/}
      {/*          onChange={handleChange}*/}
      {/*          autoComplete="off"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      {showSuggestions && matching.length ? (*/}
      {/*        <div*/}
      {/*          className="d-block w-100 dropdown-menu shadow"*/}
      {/*          style={{ maxHeight: '250px', overflowY: 'auto' }}>*/}
      {/*          {matching.map((suggestion, i) => (*/}
      {/*            <div*/}
      {/*              className={`dropdown-item ${*/}
      {/*                activeIndex === i ? 'active' : ''*/}
      {/*              }`}*/}
      {/*              key={suggestion.label}*/}
      {/*              onMouseOver={() => setActiveIndex(i)}*/}
      {/*              onMouseOut={() => setActiveIndex(null)}*/}
      {/*              onClick={() =>*/}
      {/*                handleSelect(suggestion.label, suggestion.value)*/}
      {/*              }*/}
      {/*              style={{*/}
      {/*                whiteSpace: 'unset',*/}
      {/*                cursor: 'pointer',*/}
      {/*              }}>*/}
      {/*              {suggestion.label}*/}
      {/*            </div>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      ) : (*/}
      {/*        <div />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4 h3">
            {results.length}{' '}
            {new URL(window.location.href)?.searchParams?.get('p')}{' '}
            {t('candidates')}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {results.map(
            ({
              id,
              name,
              experiences,
              profile_picture_url,
              distance,
              locality,
              city,
            }) => (
              <Card key={id} className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <div className="media">
                    <img
                      className="mr-4 rounded-circle"
                      src={profile_picture_url}
                      alt=""
                      style={{ width: 55, height: 55, objectFit: 'cover' }}
                    />
                    <div className="media-body">
                      <h5>
                        <Link
                          to={resolveDynamicPath(
                            getAppRoutes().candidateDetails,
                            id,
                          )}>
                          {name}
                        </Link>{' '}
                        <small className="text-muted">
                          {(experiences || []).length} Experiences{' '}
                        </small>
                      </h5>
                      <p className="mb-0">
                        {[locality, city].join(', ')}, {parseInt(distance)} km
                        away
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ),
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
