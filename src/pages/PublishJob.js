// @flow
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import LoginContainer from '../modules/login';
import EditJobContainer from '../modules/edit-job';
import { useTranslation } from 'react-i18next';

const Login = (): React$Node => {
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 mt-5 py-5 bg-light">
      <Container>
        <Row className="align-items-start">
          {/*<Col md={{ span: 5 }}>*/}
          {/*  <h1 className="mt-0 mb-5 text-primary">{t('Post a job')}</h1>*/}
          {/*  <img src="/assets/job.svg" className="w-100" />*/}
          {/*</Col>*/}
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="p-4 border-0 shadow-sm">
              <Card.Body>
                <h1 className="mt-0 h3 text-primary">{t('Post a job')}</h1>
                <p className="lead">
                  {t('Enter your information below to continue.')}
                </p>
                <EditJobContainer />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
