// @flow
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JobsContainer from '../modules/applications';

const Home = (): React$Node => {
  return (
    <div className="min-vh-100 mt-5 py-5 bg-light">
      <Container>
        <Row>
          <Col className="pb-4">
            <h1 className="h3 text-center">Applications</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <JobsContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
