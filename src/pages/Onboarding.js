// @flow
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import EditProfileContainer from '../modules/edit-profile';

const Onboarding = (): React$Node => {
  return (
    <div className="d-flex align-items-center py-5">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 border-0">
              <Card.Body>
                <h1 className="h3 text-primary">Onboarding</h1>
                <p>Enter your information below to continue.</p>
                <EditProfileContainer />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Onboarding;
