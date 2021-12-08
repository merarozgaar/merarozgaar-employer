// @flow
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JobDetailsContainer from '../modules/job-details';

const JobDetails = (): React$Node => (
  <div className="mt-5 py-5 bg-light">
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <JobDetailsContainer />
        </Col>
      </Row>
    </Container>
  </div>
);

export default JobDetails;
