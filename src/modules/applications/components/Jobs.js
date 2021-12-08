// @flow
import React, { Fragment, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  formatCurrency,
  parseSalary,
  parseSalaryFrequency,
  resolveDynamicPath,
} from '../../../utils';
import { getAppRoutes } from '../../../utils/contentProviders';
import { timeFromNow } from '../../../utils/dayjs';
import ScheduleView from './ScheduleView';

type JobsType = ({
  jobs: Array<Object>,
  updateStatus: Function,
  onRequestContact: Function,
}) => React$Node;

const Jobs: JobsType = ({ jobs, updateStatus, onRequestContact }) => {
  const [showScheduleView, setShowScheduleView] = useState(null);

  const toggleScheduleView = (value) =>
    setShowScheduleView((state) => (state === value ? null : value));

  return (
    <Fragment>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {jobs.map(({ id, applicant_id, name, status, created_at }) => (
              <Card key={id} className="mb-3 p-4 border-0 shadow-sm">
                <Card.Body>
                  <div className="media">
                    <div className="media-body">
                      <h5>
                        <Link
                          to={resolveDynamicPath(
                            getAppRoutes().candidateDetails,
                            applicant_id,
                          )}>
                          {name}
                        </Link>
                      </h5>
                      <p className="mb-0">{status}</p>
                      <p>Applied {timeFromNow(created_at)}</p>
                    </div>
                    <div>
                      {status === 'OPEN' && (
                        <ButtonGroup className="" aria-label="Basic example">
                          <Button
                            variant="primary"
                            onClick={updateStatus({
                              id,
                              status: 'SHORTLISTED',
                            })}>
                            Shortlist
                          </Button>
                          <Button
                            variant="danger"
                            onClick={updateStatus({ id, status: 'CLOSED' })}>
                            Reject
                          </Button>
                        </ButtonGroup>
                      )}
                      {status === 'SHORTLISTED' && (
                        <ButtonGroup className="" aria-label="Basic example">
                          <Button
                            variant="primary"
                            onClick={() => toggleScheduleView(id)}>
                            Schedule
                          </Button>
                          <Button
                            variant="primary"
                            onClick={onRequestContact({
                              applicant_id,
                              id,
                              status: 'SCREENING',
                            })}>
                            Get details
                          </Button>
                        </ButtonGroup>
                      )}
                      {status === 'SCREENING' && (
                        <ButtonGroup className="" aria-label="Basic example">
                          <Button
                            variant="primary"
                            onClick={updateStatus({ id, status: 'SCREENING' })}>
                            Offer job
                          </Button>
                          <Button
                            variant="danger"
                            onClick={updateStatus({ id, status: 'SCREENING' })}>
                            Reject
                          </Button>
                          {/*<Button variant="secondary">Right</Button>*/}
                        </ButtonGroup>
                      )}
                    </div>
                  </div>
                  <ScheduleView
                    showApplyView={showScheduleView === id}
                    onConfirmApply={() => setShowScheduleView(null)}
                    toggleApplyView={() => setShowScheduleView(null)}
                  />
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Jobs;
