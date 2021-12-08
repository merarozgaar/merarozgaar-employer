// @flow
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  formatCurrency,
  parseSalary,
  parseSalaryFrequency,
  resolveDynamicPath,
} from '../../../utils';
import { getAppRoutes } from '../../../utils/contentProviders';
import { useTranslation } from 'react-i18next';

type JobsType = ({ jobs: Array<Object> }) => React$Node;

const Candidates: JobsType = ({ jobs }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        {jobs.map(
          ({
            id,
            name,
            locality,
            city,
            distance,
            experiences,
            profile_picture_url,
          }) => (
            <Col key={id} md={{ span: 8, offset: 2 }}>
              <Card className="mb-3 border-0 shadow-sm">
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
                          {(experiences || []).length} {t('experiences')}{' '}
                        </small>
                      </h5>
                      <p className="mb-0">{[locality, city].join(', ')}</p>
                      <small className="text-muted">
                        {parseInt(distance)} {t('km away')}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
};

export default Candidates;
