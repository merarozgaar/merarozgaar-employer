// @flow
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import JobsContainer from '../modules/jobs';
import { Link } from 'react-router-dom';
import { getAppRoutes } from '../utils/contentProviders';
import { useTranslation } from 'react-i18next';

const Home = (): React$Node => {
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 mt-5 py-5 bg-light">
      <Container className="">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="pb-4">
            {/*<h1 className="mb-3 h3">{t('My Job Postings')}</h1>*/}
            <JobsContainer />
          </Col>
          <Col md={{ span: 5 }}></Col>
        </Row>
      </Container>
      {/*<div className="fixed-bottom d-flex justify-content-end p-3">*/}
      {/*  <Button*/}
      {/*    as={Link}*/}
      {/*    size="lg"*/}
      {/*    className="px-5 rounded-pill shadow"*/}
      {/*    to={getAppRoutes().createJob}*/}
      {/*    // onClick={toggleApplyView}*/}
      {/*  >*/}
      {/*    {t('Post a job')}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default Home;
