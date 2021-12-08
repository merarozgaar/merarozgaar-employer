// @flow
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CandiateDetailsContainer from '../modules/candidate-details';

const CandidateDetails = (): React$Node => (
  <div className="mt-5 py-5 bg-light">
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <CandiateDetailsContainer />
        </Col>
      </Row>
    </Container>
  </div>
);

export default CandidateDetails;
