// @flow
import React, { Fragment } from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  formatCurrency,
  parseSalary,
  parseSalaryFrequency,
  resolveDynamicPath,
} from '../../../utils';
import { getAppRoutes } from '../../../utils/contentProviders';
import { timeFromNow } from '../../../utils/dayjs';

type JobsType = ({ jobs: Array<Object> }) => React$Node;

const Jobs: JobsType = ({ jobs }) => {
  return (
    <Fragment>
      {jobs.map(
        ({ id, profession, company, created_at, active, company_logo_url }) => (
          <Card key={id} className="mb-3 px-3 border-0 shadow-sm">
            <Card.Body>
              <div className="media">
                <img
                  className="mr-4 rounded-circle"
                  src={company_logo_url}
                  alt=""
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <div className="media-body">
                  <h5>
                    <Link
                      to={resolveDynamicPath(getAppRoutes().jobDetails, id)}>
                      {profession}
                    </Link>
                  </h5>
                  <p className="mb-0">{company}</p>
                  <small className="text-muted">
                    Posted {timeFromNow(created_at)}
                  </small>
                </div>
                <div>
                  <Badge pill variant="light">
                    {active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        ),
      )}
    </Fragment>
  );
};

export default Jobs;
